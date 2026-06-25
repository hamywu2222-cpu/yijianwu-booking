'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';

import { BUSINESS_LINE } from '@/lib/business';

const LINE_URL = BUSINESS_LINE.url;
const LINE_ID = BUSINESS_LINE.id;
const GAS_URL =
  process.env.NEXT_PUBLIC_BOOKING_FORM_URL ||
  'https://script.google.com/macros/s/AKfycbx3J43TGTOi5-HyB65Rc0B3ELQ6lubli1biES_ZpCTyk7WFXdV84xuyUk2vplXEP4WQtA/exec';

const MULTI_ROOM_TYPE = '訂一間以上';

type RoomTypeConfig = {
  value: string;
  label: string;
  maxPeople: number;
  peopleHint?: string;
  roomHint?: string;
  requiresRoomCountInNote?: boolean;
};

const ROOM_TYPES: RoomTypeConfig[] = [
  {
    value: '和鳴雙人房',
    label: '和鳴雙人房（共4間相同格局，訂其中1間，衛浴共用）— NT$1,600/晚',
    maxPeople: 2,
    peopleHint: '舒適建議人數 2 人，如需加鋪請備註',
  },
  {
    value: '和風4-6人家庭房',
    label: '和風4-6人家庭房（僅此1間，兩張雙人床，衛浴共用）— NT$3,200起（4人）+NT$600/人',
    maxPeople: 6,
    peopleHint: '舒適建議人數 4–6 人，如需加鋪請備註',
  },
  {
    value: '包房方案',
    label: '一間屋包房優惠方案(5間)（4間和鳴雙人房+1間和風4-6人家庭房，衛浴共用，舒適建議人數 12–14）— 平日 NT$8,800 / 假日 NT$9,200（價格固定，特殊活動日另詢）',
    maxPeople: 30,
    peopleHint:
      '舒適建議 12–14 人，最多 19 人。超過 14 人請填 14 人下單，備註寫實際共幾人（超出每人 +NT$600）',
  },
  {
    value: MULTI_ROOM_TYPE,
    label: '訂一間以上請選這個（備註請填間數，老闆確認安排）',
    maxPeople: 30,
    peopleHint: '請填總入住人數',
    roomHint: '備註請填間數房型（例：2雙人、1家庭1雙人）；其他如行李寄放等可一併備註，老闆確認安排',
    requiresRoomCountInNote: true,
  },
];

function hasRoomCountInNote(note: string) {
  return /(\d+雙人|\d+家庭\d+雙人)/.test(note.trim());
}

function validateNote(note: string, roomType: string): string | undefined {
  const room = ROOM_TYPES.find((item) => item.value === roomType);
  if (!room?.requiresRoomCountInNote) return undefined;

  const trimmed = note.trim();
  if (!trimmed) {
    return '請於備註填寫間數房型（例：2雙人、1家庭1雙人）';
  }
  if (!hasRoomCountInNote(trimmed)) {
    return '請於備註填寫間數房型（例：2雙人、1家庭1雙人）';
  }
  return undefined;
}

type FormField = 'name' | 'phone' | 'checkInDate' | 'checkOutDate' | 'roomType' | 'numberOfPeople';
type FormErrors = Partial<Record<FormField, string>>;

const inputClass =
  'w-full border border-[#D1C9BE] rounded-2xl px-5 py-3.5 text-base text-[#3F3A36] placeholder:text-[#9A9389]';
const labelClass = 'block text-xs font-medium tracking-widest text-[#8B7355] mb-1.5';
const errorClass = 'mt-1.5 text-xs text-red-600';

function todayString() {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, '0');
  const d = String(now.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

const FIELD_IDS: Record<FormField, string> = {
  name: 'booking-name',
  phone: 'booking-phone',
  checkInDate: 'booking-check-in',
  checkOutDate: 'booking-check-out',
  roomType: 'booking-room-type',
  numberOfPeople: 'booking-people',
};

const FIELD_ORDER: FormField[] = [
  'name',
  'phone',
  'checkInDate',
  'checkOutDate',
  'roomType',
  'numberOfPeople',
];

function addDays(dateStr: string, days: number) {
  const date = new Date(`${dateStr}T00:00:00`);
  date.setDate(date.getDate() + days);
  return date.toISOString().slice(0, 10);
}

function generateReferenceNumber() {
  const dateStr = todayString().replace(/-/g, '');
  const random = Math.floor(1000 + Math.random() * 9000);
  return `${dateStr}-${random}`;
}

function validateForm(values: Record<FormField, string>): FormErrors {
  const errors: FormErrors = {};
  const today = todayString();

  if (!values.name.trim()) {
    errors.name = '請輸入姓名';
  }

  if (!/^09\d{8}$/.test(values.phone)) {
    errors.phone = '請輸入有效的手機號碼（09 開頭，共 10 碼）';
  }

  if (!values.checkInDate) {
    errors.checkInDate = '請選擇入住日期';
  } else if (values.checkInDate < today) {
    errors.checkInDate = '入住日期不可早於今天';
  }

  if (!values.checkOutDate) {
    errors.checkOutDate = '請選擇退房日期';
  } else if (values.checkInDate && values.checkOutDate <= values.checkInDate) {
    errors.checkOutDate = '退房日期必須晚於入住日期';
  }

  if (!values.roomType) {
    errors.roomType = '請選擇房型';
  }

  const people = Number(values.numberOfPeople);
  const room = ROOM_TYPES.find((item) => item.value === values.roomType);

  if (!values.numberOfPeople || !Number.isFinite(people) || people < 1) {
    errors.numberOfPeople = '請輸入有效人數';
  } else if (room && people > room.maxPeople) {
    errors.numberOfPeople = `${room.value} 建議最多 ${room.maxPeople} 人`;
  }

  return errors;
}

function SuccessModal({
  referenceNumber,
  copied,
  onCopy,
  onClose,
}: {
  referenceNumber: string;
  copied: boolean;
  onCopy: () => void;
  onClose: () => void;
}) {
  const lastFour = referenceNumber.slice(-4);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/55 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="booking-success-title"
    >
      <div className="bg-white rounded-3xl p-6 md:p-8 max-w-md w-full text-center border border-green-100 shadow-2xl">
        <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center text-2xl">
          ✅
        </div>
        <h2 id="booking-success-title" className="text-lg font-semibold text-[#3F3A36] mb-1">
          表單已收到（僅為詢問）
        </h2>
        <p className="text-sm text-[#6B665F] mb-4">請記下詢問編號，並到 LINE 回傳後 4 碼確認訂單</p>

        <div className="bg-[#F8F5F1] rounded-2xl p-5 mb-4">
          <p className="text-xs text-[#8B7355] tracking-widest mb-1">您的詢問編號</p>
          <p className="text-2xl md:text-3xl font-semibold tracking-widest text-[#3F3A36] break-all">
            {referenceNumber}
          </p>
          <p className="text-sm text-[#6B665F] mt-3">
            請回傳後 4 碼：<span className="font-bold text-2xl text-[#3F3A36]">{lastFour}</span>
          </p>
        </div>

        <div className="space-y-3">
          <button
            type="button"
            onClick={onCopy}
            className="w-full inline-flex items-center justify-center border border-[#3F3A36] text-[#3F3A36] px-4 py-3 rounded-2xl text-sm font-medium hover:bg-[#3F3A36] hover:text-white transition-colors"
          >
            {copied ? '已複製後 4 碼' : `複製後 4 碼（${lastFour}）`}
          </button>
          <a
            href={LINE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full bg-[#00C300] text-white py-3.5 rounded-2xl font-medium hover:bg-[#00A000] transition-all"
          >
            📱 前往 LINE 官方 {LINE_ID} 回傳後 4 碼
          </a>
          <button
            type="button"
            onClick={onClose}
            className="w-full py-3 text-sm text-[#6B665F] hover:text-[#3F3A36] transition-colors"
          >
            關閉
          </button>
        </div>

        <p className="text-xs text-[#8B7355] mt-4">⚠️ 必須加入 LINE 官方，未加入無法確認訂房</p>
      </div>
    </div>
  );
}

export default function BookingForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [referenceNumber, setReferenceNumber] = useState('');
  const [copied, setCopied] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [values, setValues] = useState<Record<FormField, string>>({
    name: '',
    phone: '',
    checkInDate: '',
    checkOutDate: '',
    roomType: '',
    numberOfPeople: '',
  });
  const [note, setNote] = useState('');
  const [noteError, setNoteError] = useState('');
  const [validationSummary, setValidationSummary] = useState('');

  const minCheckIn = todayString();
  const minCheckOut = values.checkInDate ? addDays(values.checkInDate, 1) : addDays(minCheckIn, 1);
  const showStickySubmit = submitStatus !== 'success';

  const nights = useMemo(() => {
    if (!values.checkInDate || !values.checkOutDate) return 0;
    const checkIn = new Date(`${values.checkInDate}T00:00:00`);
    const checkOut = new Date(`${values.checkOutDate}T00:00:00`);
    const diff = Math.round((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : 0;
  }, [values.checkInDate, values.checkOutDate]);

  const selectedRoom = ROOM_TYPES.find((room) => room.value === values.roomType);
  const requiresRoomCountInNote = selectedRoom?.requiresRoomCountInNote ?? false;

  useEffect(() => {
    if (submitStatus === 'success') {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = '';
      };
    }
  }, [submitStatus]);

  const updateField = (field: FormField, value: string) => {
    setValues((prev) => {
      const next = { ...prev, [field]: value };

      if (field === 'checkInDate' && next.checkOutDate && next.checkOutDate <= value) {
        next.checkOutDate = '';
      }

      return next;
    });

    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
      setValidationSummary('');
    }
  };

  const handlePhoneInput = (value: string) => {
    updateField('phone', value.replace(/\D/g, '').slice(0, 10));
  };

  const handleCopyCode = async () => {
    const code = referenceNumber.slice(-4);
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  const focusFirstError = (nextErrors: FormErrors) => {
    const firstField = FIELD_ORDER.find((field) => nextErrors[field]);
    if (!firstField) return;

    const el = document.getElementById(FIELD_IDS[firstField]);
    el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    if (el instanceof HTMLElement) {
      window.setTimeout(() => el.focus(), 300);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitStatus('idle');
    setValidationSummary('');

    const nextErrors = validateForm(values);
    const nextNoteError = validateNote(note, values.roomType);

    if (Object.keys(nextErrors).length > 0 || nextNoteError) {
      setErrors(nextErrors);
      setNoteError(nextNoteError ?? '');

      if (nextNoteError) {
        setValidationSummary(nextNoteError);
        document.getElementById('booking-note')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        window.setTimeout(() => document.getElementById('booking-note')?.focus(), 300);
      } else {
        const firstField = FIELD_ORDER.find((field) => nextErrors[field]);
        setValidationSummary(firstField ? nextErrors[firstField]! : '請檢查表單欄位');
        focusFirstError(nextErrors);
      }
      return;
    }

    setErrors({});
    setNoteError('');
    setValidationSummary('');
    setIsSubmitting(true);

    const refNum = generateReferenceNumber();
    setReferenceNumber(refNum);

    const params = new URLSearchParams();
    params.append('name', values.name.trim());
    params.append('phone', values.phone);
    params.append('checkInDate', values.checkInDate);
    params.append('checkOutDate', values.checkOutDate);
    params.append('roomType', values.roomType);
    params.append('numberOfPeople', values.numberOfPeople);
    params.append('note', note);
    params.append('referenceNumber', refNum);

    try {
      await fetch(GAS_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: params.toString(),
      });

      setSubmitStatus('success');
      setValues({
        name: '',
        phone: '',
        checkInDate: '',
        checkOutDate: '',
        roomType: '',
        numberOfPeople: '',
      });
      setNote('');
    } catch (error) {
      console.error('提交錯誤:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <form
        id="booking-form"
        onSubmit={handleSubmit}
        noValidate
        className="bg-white p-8 md:p-10 rounded-3xl border border-[#EDE8E0] shadow-sm space-y-7 pb-28 md:pb-10"
      >
        <div className="bg-[#F8F5F1] border border-[#EDE8E0] rounded-2xl p-4">
          <p className="text-sm font-medium text-[#3F3A36] mb-2">訂房步驟</p>
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 text-sm text-[#6B665F]">
            <span className="inline-flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-full bg-[#3F3A36] text-white text-xs flex items-center justify-center shrink-0">
                1
              </span>
              填寫資料並按「送出詢問」
            </span>
            <span className="hidden sm:inline text-[#8B7355]">→</span>
            <span className="inline-flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-full bg-[#00C300] text-white text-xs flex items-center justify-center shrink-0">
                2
              </span>
              加入 LINE 並回傳後 4 碼
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="booking-name" className={labelClass}>
              姓名
            </label>
            <input
              id="booking-name"
              type="text"
              name="name"
              value={values.name}
              onChange={(e) => updateField('name', e.target.value)}
              className={inputClass}
              placeholder="您的姓名"
              autoComplete="name"
              required
            />
            {errors.name && <p className={errorClass}>{errors.name}</p>}
          </div>
          <div>
            <label htmlFor="booking-phone" className={labelClass}>
              聯絡電話
            </label>
            <input
              id="booking-phone"
              type="tel"
              name="phone"
              value={values.phone}
              onChange={(e) => handlePhoneInput(e.target.value)}
              className={inputClass}
              placeholder="0912345678"
              inputMode="numeric"
              autoComplete="tel"
              required
            />
            {errors.phone && <p className={errorClass}>{errors.phone}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="booking-check-in" className={labelClass}>
              入住日期
            </label>
            <input
              id="booking-check-in"
              type="date"
              name="checkInDate"
              value={values.checkInDate}
              min={minCheckIn}
              onChange={(e) => updateField('checkInDate', e.target.value)}
              className={inputClass}
              required
            />
            {errors.checkInDate && <p className={errorClass}>{errors.checkInDate}</p>}
          </div>
          <div>
            <label htmlFor="booking-check-out" className={labelClass}>
              退房日期
            </label>
            <input
              id="booking-check-out"
              type="date"
              name="checkOutDate"
              value={values.checkOutDate}
              min={minCheckOut}
              onChange={(e) => updateField('checkOutDate', e.target.value)}
              className={inputClass}
              required
            />
            {errors.checkOutDate && <p className={errorClass}>{errors.checkOutDate}</p>}
            {nights > 0 && <p className="mt-1.5 text-xs text-[#8B7355]">共 {nights} 晚</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="booking-room-type" className={labelClass}>
              房型
            </label>
            <select
              id="booking-room-type"
              name="roomType"
              value={values.roomType}
              onChange={(e) => updateField('roomType', e.target.value)}
              className={`${inputClass} bg-white`}
              required
            >
              <option value="">請選擇</option>
              {ROOM_TYPES.map((room) => (
                <option key={room.value} value={room.value}>
                  {room.label}
                </option>
              ))}
            </select>
            {errors.roomType && <p className={errorClass}>{errors.roomType}</p>}
            {selectedRoom?.roomHint && (
              <p className="mt-1.5 text-xs text-[#8B7355] leading-relaxed">{selectedRoom.roomHint}</p>
            )}
          </div>
          <div>
            <label htmlFor="booking-people" className={labelClass}>
              人數
            </label>
            <input
              id="booking-people"
              type="number"
              name="numberOfPeople"
              value={values.numberOfPeople}
              min={1}
              max={selectedRoom?.maxPeople}
              onChange={(e) => updateField('numberOfPeople', e.target.value)}
              className={inputClass}
              placeholder="2"
              required
            />
            {selectedRoom && (
              <p className="mt-1.5 text-xs text-[#8B7355]">
                {selectedRoom.peopleHint ?? `此房型建議最多 ${selectedRoom.maxPeople} 人`}
              </p>
            )}
            {errors.numberOfPeople && <p className={errorClass}>{errors.numberOfPeople}</p>}
          </div>
        </div>

        <div>
          <label htmlFor="booking-note" className={labelClass}>
            {requiresRoomCountInNote ? '備註（必填：請填間數房型）' : '備註（選填）'}
          </label>
          <textarea
            id="booking-note"
            name="note"
            value={note}
            onChange={(e) => {
              setNote(e.target.value);
              if (noteError) setNoteError('');
              if (validationSummary && requiresRoomCountInNote) setValidationSummary('');
            }}
            rows={3}
            className={`${inputClass} resize-y`}
            placeholder={
              requiresRoomCountInNote
                ? '例：2雙人、1家庭1雙人；其他：行李寄放等'
                : '加鋪、提早放行李等'
            }
          />
          {noteError && <p className={errorClass}>{noteError}</p>}
          <p className="mt-1.5 text-xs text-[#8B7355] leading-relaxed">
            {requiresRoomCountInNote ? (
              <>
                老闆確認房況後安排；若需全館包房可參考{' '}
                <Link href="/#package" className="underline hover:text-[#3F3A36] transition-colors">
                  一間屋包房優惠方案(5間)
                </Link>
                （舒適建議人數 12–14），皆須提早詢問。
              </>
            ) : (
              <>
                訂多間可備註間數房型（例：2雙人、1家庭1雙人），老闆確認安排；另有
                <Link href="/#package" className="underline hover:text-[#3F3A36] transition-colors">
                  一間屋包房優惠方案(5間)
                </Link>
                （舒適建議人數 12–14）可參考，皆須提早詢問確認房況。
              </>
            )}
          </p>
        </div>

        {validationSummary && (
          <p className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700" role="alert">
            {validationSummary}
          </p>
        )}

        <div className="hidden md:block space-y-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 rounded-2xl bg-[#3F3A36] text-white text-sm tracking-[2px] hover:bg-[#2C2926] active:scale-[0.99] transition-all disabled:opacity-60"
          >
            {isSubmitting ? '送出中...' : '送出詢問'}
          </button>

          <div className="bg-[#E8F5E9] border border-[#4CAF50] rounded-2xl p-4 text-center">
            <p className="text-sm font-semibold text-[#2E7D32]">送出成功後，請加入 LINE {LINE_ID}</p>
            <p className="text-xs text-[#2E7D32]/80 mt-1">並回傳訂單後 4 碼完成確認（請先送出表單，再前往 LINE）</p>
          </div>
        </div>

        {submitStatus === 'error' && (
          <p className="text-center text-red-600" role="alert">
            送出失敗，請稍後再試，或加入 LINE {LINE_ID} 詢問。
          </p>
        )}
      </form>

      {showStickySubmit && (
        <div className="md:hidden fixed bottom-0 left-0 right-0 z-[60] bg-white/95 backdrop-blur-md border-t border-[#EDE8E0] px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] shadow-[0_-8px_24px_rgba(0,0,0,0.08)]">
          {validationSummary ? (
            <p className="mb-2 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-center text-xs text-red-700" role="alert">
              {validationSummary}
            </p>
          ) : (
            <p className="text-center text-xs text-[#8B7355] mb-2">填完請先按送出，成功後再到 LINE 回傳後 4 碼</p>
          )}
          <button
            type="submit"
            form="booking-form"
            disabled={isSubmitting}
            className="w-full py-4 rounded-2xl bg-[#3F3A36] text-white text-sm tracking-[2px] hover:bg-[#2C2926] active:scale-[0.99] transition-all disabled:opacity-60"
          >
            {isSubmitting ? '送出中...' : '送出詢問'}
          </button>
        </div>
      )}

      {submitStatus === 'success' && referenceNumber && (
        <SuccessModal
          referenceNumber={referenceNumber}
          copied={copied}
          onCopy={handleCopyCode}
          onClose={() => setSubmitStatus('idle')}
        />
      )}
    </>
  );
}