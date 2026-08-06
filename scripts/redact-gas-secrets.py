from pathlib import Path
import re

p = Path(__file__).resolve().parents[1] / "docs" / "BookingFormGAS.gs"
t = p.read_text(encoding="utf-8-sig")

t = re.sub(
    r"const SPREADSHEET_ID = '[^']*'",
    "const SPREADSHEET_ID = 'YOUR_SPREADSHEET_ID'",
    t,
)
t = re.sub(
    r"const CHANNEL_ACCESS_TOKEN = '[^']*'",
    "const CHANNEL_ACCESS_TOKEN = 'YOUR_LINE_CHANNEL_ACCESS_TOKEN'",
    t,
)
t = re.sub(
    r"const ADMIN_LINE_USER_ID = '[^']*'",
    "const ADMIN_LINE_USER_ID = 'YOUR_ADMIN_LINE_USER_ID'",
    t,
)

notice = (
    "// [SECURITY] Do NOT commit real tokens. Rotate LINE Channel Access Token in LINE Developers.\n"
    "// Prefer PropertiesService.getScriptProperties() for secrets in production GAS.\n\n"
)

if "[SECURITY]" not in t:
    lines = t.splitlines(True)
    # insert after initial comment header (first 3 lines)
    t = "".join(lines[:3]) + notice + "".join(lines[3:])

p.write_text(t, encoding="utf-8")
print("redacted:", p)
print("token_still_present:", "AlsJhZS" in t)
