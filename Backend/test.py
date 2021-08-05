from datetime import date, datetime, time, timedelta, timezone

import pytz

# for tz in pytz.all_timezones:
#     print(tz)

# print(str(datetime.utcnow())[:-7])
print("".join(str(datetime.utcnow() - timedelta(2))[:10].split("-")))
