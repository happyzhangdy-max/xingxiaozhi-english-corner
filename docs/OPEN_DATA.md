# Open Data and Word-Bank Provenance

Updated: 2026-08-09

## What ships in this repository

The first release contains 126 project-authored bilingual learning entries in 14 banks. The definitions, examples, Chinese translations, notes, and pedagogical grouping were written for this project; they are not a verbatim export of an external dictionary.

## O*NET 30.3

The nine workplace banks use occupation categories and technology context informed by the O*NET 30.3 Database:

- General and Operations Managers (11-1021.00)
- Sales Managers (11-2022.00)
- Human Resources Specialists (13-1071.00)
- Project Management Specialists (13-1082.00)
- Market Research Analysts and Marketing Specialists (13-1161.00)
- Accountants and Auditors (13-2011.00)
- Software Developers (15-1252.00)
- Web and Digital Interface Designers (15-1255.00)
- Operations Research Analysts (15-2031.00)
- Data Scientists (15-2051.00)
- Customer Service Representatives (43-4051.00)

Attribution: This product uses information from the O*NET 30.3 Database by USDOL/ETA, available under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/). 行小之英语角 modified the source information and added bilingual wording, examples, translations, grouping, and learning interactions. USDOL/ETA has not approved, endorsed, or tested these modifications.

- Official database downloads: <https://www.onetcenter.org/database.html>
- Official licensing terms: <https://www.onetcenter.org/license_db.html>

## Candidate future sources

Large spelling lists such as `dwyl/english-words` and pronunciation dictionaries such as CMUdict were evaluated but are **not bundled in the current release**. A spelling list alone does not supply reliable meanings, usage context, or pedagogical quality, so importing hundreds of thousands of tokens would make search noisier without satisfying the learning goal.

Any future source must have a compatible license, documented provenance, a repeatable import script, and a human review path for definitions and examples.
