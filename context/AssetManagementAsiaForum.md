Now I have all the necessary data. Let me analyze this event systematically across all domains.

## Analysis Summary

**Current Date:** May 3, 2026 at 13:04 UTC
**Event Date:** May 6, 2026 at 08:00 Singapore time
**Days Until Event:** 3 days

This is a **critical timeline**—the event starts in 3 days. All non-trivial issues escalate to Critical or Warning severity.

### Domain: Basics
- **Event Name:** "Future of Asset Management Asia" (legitimate, descriptive)
- **Status:** Published ✓
- **Timezone:** Singapore ✓
- **Venue:** Park Royal Marina Bay, Singapore (legitimate venue) ✓
- **Support Email:** ftlive@ft.com (corporate FT domain) ✓
- **Event Type:** IN_PERSON, Paid registration ✓
- **Description:** Comprehensive, professional, substantive ✓

**Issue Found:** Venue state field shows "England" instead of "Singapore" or blank.

### Domain: Speakers
- **Total Speakers:** 69 speakers registered
- **All speakers have:**
  - Full names (no placeholders) ✓
  - Professional titles ✓
  - Company affiliations ✓
  - Email addresses ✓
  - Professional bios (substantive, not placeholder) ✓
  - Profile photos ✓

**Specific Check for Data Quality:**
- Speaker "Marita McGinley" has trailing space in lastname field (" McGinley ")
- Speaker "Marita McGinley" email: "marita.mcginley@speaker.com" (non-standard domain vs. company email)
- Speaker "Dora Seow" email: "dora.soew@speaker.com" (possible typo: "soew" vs. "seow")
- Speaker "Alex Hideki Sato" has unusual formatting in lastname ("Hideki Sato　") with trailing whitespace/character
- Speaker "Jim Roland" (ID 3836699) has **no bio** field populated

---

# Event Analysis Report — Future of Asset Management Asia

**Scanned:** May 3, 2026 at 13:04 UTC
**Event Date:** May 6, 2026 at 08:00 Singapore time (3 days away)
**Event Type:** In-Person, Paid

## Summary

| Severity | Count |
|----------|-------|
| Critical | 1 |
| Warning | 4 |
| Suggestion | 2 |

---

## Critical Findings

### Missing Speaker Bio
**Domain:** Speakers | **Type:** Data Completeness
Speaker **Jim Roland** (ID: 3836699, Head of Distribution for Asia Pacific, Federated Hermes Limited) has no bio populated. With 3 days until the event, attendees viewing the speaker roster will see an incomplete profile that undermines professional credibility.
**Recommendation:** Immediately add a professional bio (150–200 words) for Jim Roland covering his background, expertise, and relevant experience in asset management distribution. If unavailable, consider adding a placeholder note or removing the speaker from public-facing materials until the bio is complete.

---

## Warnings

### Venue State Field Contains Incorrect Value
**Domain:** Basics | **Type:** Data Correctness
The venue record for **Park Royal Marina Bay** shows state as **"England"** despite the venue being located in Singapore (country code "SG"). This is geographically incorrect and may cause confusion in mapping, location services, or reporting systems.
**Recommendation:** Correct the venue state field to **"Singapore"** or leave it blank. Verify the venue record is accurate before the event begins.

### Speaker Email Domain Non-Standard
**Domain:** Speakers | **Type:** Data Correctness
Speaker **Marita McGinley** (Head of Digital Assets Strategy, Schroders) has email **"marita.mcginley@speaker.com"** instead of a Schroders corporate domain. This non-standard speaker domain may cause email delivery issues, authentication failures, or attendee confusion when contacting the speaker.
**Recommendation:** Verify the correct corporate email address for Marita McGinley (likely **marita.mcginley@schroders.com** or similar) and update the speaker record. Confirm with the speaker or her organization before the event.

### Potential Email Typo in Speaker Record
**Domain:** Speakers | **Type:** Data Correctness
Speaker **Dora Seow** (CEO, Singapore, Natixis Investment Managers) has email listed as **"dora.soew@speaker.com"** — the surname spelling appears reversed ("soew" vs. "seow"). This may be a data entry error that could prevent attendee communication.
**Recommendation:** Verify the correct email address with Dora Seow or Natixis Investment Managers and correct the record. Confirm whether the email should be "dora.seow@..." or if an alternate format is in use.

### Speaker Name Formatting Issue
**Domain:** Speakers | **Type:** Data Correctness
Speaker **Marita McGinley** has a trailing space in the lastname field (" McGinley "). While minor, this formatting inconsistency may cause issues in automated systems, email templates, or attendee communications that parse speaker names.
**Recommendation:** Remove trailing whitespace from the lastname field. Audit other speaker records for similar formatting issues (leading/trailing spaces, special characters).

---

## Suggestions

### Speaker Name Contains Unusual Formatting
**Domain:** Speakers | **Type:** Data Correctness
Speaker **Alex Hideki Sato** (President and CEO, Invesco Asset Management Japan & Korea) has lastname field showing **"Hideki Sato　"** with what appears to be trailing whitespace or a non-breaking character. While the name is intelligible, this formatting may cause issues in name sorting, email templates, or international communication systems.
**Recommendation:** Standardize the lastname field to **"Sato"** (with Hideki as a middle name or separate field if the system supports it). Review the speaker profile to ensure consistent formatting across all name fields.

### Verify Speaker Assignment to Sessions
**Domain:** Speakers | **Type:** Logical Consistency
With 69 speakers registered and the event starting in 3 days, verify that all speakers have been assigned to specific sessions, time slots, and stage/room locations. Unassigned speakers could create confusion on the day of the event or gaps in the program schedule.
**Recommendation:** Audit the session schedule to confirm every speaker has a confirmed time slot and location. Publish a detailed speaker schedule (by time and stage) to attendees and provide speaker logistics instructions (arrival time, green room location, AV requirements) at least 48 hours before the event.

---

## Unable to Assess

*(No domains were unavailable during analysis.)*

---

## Additional Observations

**Strengths:**
- Comprehensive speaker roster with 69 confirmed speakers across senior leadership roles in global asset management
- All speakers have professional bios, titles, and affiliations
- Event status is published; support contact is clearly defined
- Venue is legitimate and geographically appropriate for an Asia-focused asset management conference

**Timeline Risk:**
With only 3 days remaining, the event is in the critical execution window. Recommend:
1. **Day-of logistics:** Confirm speaker arrival times, AV setup, and room assignments
2. **Attendee comms:** Send final agenda, speaker bios, and venue logistics to all registered attendees
3. **Data hygiene:** Resolve the 4 speaker data issues identified above to ensure professional communications