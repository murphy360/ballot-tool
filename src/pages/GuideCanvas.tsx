import { Page, Section, Text, Rows, Properties, Callout, TableOfContents, LinkCards } from "../canvas";

export default function App() {
  return (
    <Page
      title="Your Nov 3, 2026 ballot (Twinsburg, OH)"
      summary="The City of Twinsburg (Summit County) ballot for Tuesday's general election: every race and issue with neutral notes, a closer look at the U.S. Senate race and the governor candidates on school funding, plus polling hours and the photo ID rule."
      width="column"
    >
      <TableOfContents
        items={[
          { label: "At a glance", id: "glance" },
          { label: "Issues on the ballot", id: "issues" },
          { label: "Federal races", id: "federal" },
          { label: "U.S. Senate race in depth", id: "senate-detail" },
          { label: "Statewide offices", id: "statewide" },
          { label: "Governor candidates on school funding", id: "gov-schools" },
          { label: "Ohio Supreme Court and Court of Appeals", id: "courts" },
          { label: "State legislature", id: "legislature" },
          { label: "Summit County Council", id: "county" },
          { label: "Summit County judges", id: "judges" },
          { label: "Key topics side by side", id: "topics" },
          { label: "Down-ballot races: records and ratings", id: "downballot" },
          { label: "Voting on Tuesday", id: "practical" },
          { label: "Sources", id: "sources" },
        ]}
      />

      <Section heading="At a glance" id="glance">
        <Rows
          rows={[
            { lead: "Issue", title: "State Issue 3: photo ID to vote (constitutional amendment)", detail: "Statewide" },
            { lead: "Issue", title: "Issue 38: Twinsburg rezoning of 2570 Post Road", detail: "City of Twinsburg only. No tax." },
            { lead: "Federal", title: "U.S. Senate (special election, term ends 2029)", detail: "Husted (R, incumbent), Brown (D), Redpath (L), Levy (other party)" },
            { lead: "Federal", title: "U.S. House, 13th District", detail: "Sykes (D, incumbent), Coleman (R), Dixit (independent)" },
            { lead: "State", title: "Governor and Lt. Governor", detail: "Ramaswamy/McColley (R), Acton/Pepper (D), Kissick/Mills (L)" },
            { lead: "State", title: "Attorney General", detail: "Faber (R), Kulewicz (D)" },
            { lead: "State", title: "Secretary of State", detail: "Sprague (R), Russo (D), Pruss (L)" },
            { lead: "State", title: "Auditor", detail: "LaRose (R), Blackwell (D)" },
            { lead: "State", title: "Treasurer", detail: "Edwards (R), Walsh (D)" },
            { lead: "Courts", title: "Ohio Supreme Court, 2 seats", detail: "Hawkins (R, inc.) vs Zayas (D); Brunner (D, inc.) vs O'Donnell (R)" },
            { lead: "Courts", title: "9th District Court of Appeals, 2 seats", detail: "Sutton (D, inc.) vs Curtin (R); Manning (R, inc.) vs T. Galonski (D)" },
            { lead: "State", title: "Ohio Senate, District 27", detail: "Demetriou (R), Roberto (D). Open seat." },
            { lead: "State", title: "Ohio House, District 35", detail: "Sandhu (R), Salamon (D). Open seat." },
            { lead: "County", title: "Summit County Council at large (vote for 3)", detail: "Barker, Bollas, Chapman (R); Dickinson, Donofrio, Walters (D)" },
            { lead: "Courts", title: "Summit County judges, 9 races", detail: "6 Common Pleas General Division seats (1 unopposed), plus Juvenile, Domestic Relations and Probate. Judges in these races are listed without party." },
          ]}
        />
        <Callout tone="info" lead="This is the City of Twinsburg ballot">
          It comes from the county's official candidate list and issue synopsis, cross-checked against The Gist's City of Twinsburg ballot. Every part of the city is in the same districts: U.S. House 13, Ohio Senate 27, Ohio House 35 and Twinsburg City Schools. So the ballot should be the same in every city precinct. The county's sample ballot page is lookup.boe.ohio.gov/vtrapp/summit/ballotlist.aspx
        </Callout>
      </Section>

      <Section heading="Issues on the ballot" id="issues">
        <Section heading="State Issue 3: photo ID to vote">
          <Properties
            items={[
              { label: "What it does", value: "Adds photo ID to the Ohio Constitution. In-person voters would have to show an approved government photo ID. Voters who don't vote in person would need photo ID unless state law lets them use a signature plus another specified identifier. State law could create another way to verify voters with a sincere religious objection to being photographed." },
              { label: "Approved IDs", value: "Unexpired Ohio driver license or state ID, U.S. passport or passport card, U.S. military ID, Ohio National Guard ID, or U.S. Veterans Affairs ID" },
              { label: "New or renewal", value: "New constitutional amendment, put on the ballot by the legislature. It takes effect immediately if passed." },
              { label: "Cost", value: "None. This is not a tax." },
              { label: "Yes means", value: "The photo ID requirement goes into the Ohio Constitution." },
              { label: "No means", value: "The constitution stays as it is. Ohio already requires photo ID at the polls under current state law." },
              { label: "Source", value: "boe.ohio.gov/summit/c/upload/Election_60IssueSynopsis.pdf" },
            ]}
          />
        </Section>
        <Section heading="Issue 38: Twinsburg zoning amendment (City of Twinsburg)">
          <Properties
            items={[
              { label: "What it does", value: "Asks voters to approve Ordinance 2026-093, which rezones 3.2 acres at 2570 Post Road (Parcel 64-02608) from PF (Public Facilities) to R-3 Single Unit Residential." },
              { label: "New or renewal", value: "New. It is a zoning question, not a levy." },
              { label: "Cost", value: "None. This is not a tax." },
              { label: "Yes means", value: "The 3.2 acres are rezoned for single-family homes (R-3)." },
              { label: "No means", value: "The land stays zoned Public Facilities." },
              { label: "Source", value: "boe.ohio.gov/summit/c/upload/Election_60IssueSynopsis.pdf and thegist.vote/question/2026-general-oh/summit-twinsburg-post-road-rezoning" },
            ]}
          />
        </Section>
        <Section heading="Not on this ballot">
          <Text>There is no Twinsburg City Schools levy, Twinsburg library levy, parks levy or countywide issue on Summit County's November list. None of the county's local issues are for those groups (boe.ohio.gov/summit/c/upload/Election_60IssueSynopsis.pdf). The school district's 1.25% income tax failed on May 5, 2026, by 3,888 to 2,310, and it is not back on this ballot (clevelandjewishnews.com report on the May result; propertytax.report/market/taxes/ohio/schools/budgets/district/twinsburg-city-summit).</Text>
        </Section>
      </Section>

      <Section heading="Federal races" id="federal">
        <Section heading="U.S. Senate (special election to finish the term ending Jan 3, 2029)">
          <Rows
            rows={[
              { lead: "R", title: "Jon Husted", meta: "Incumbent", detail: "Appointed in January 2025 to fill J.D. Vance's seat; former lieutenant governor. Says he's focused on tax cuts (no tax on tips, overtime or Social Security), permitting reform, and making data centers pay for the power they use. Sources: ideastream.org/u-s-senate, wtov9.com" },
              { lead: "D", title: "Sherrod Brown", detail: "Former U.S. senator from Ohio. Says he's focused on workers and affordability, and wants to end data-center tax breaks and give local communities more say. Sources: wtov9.com, ideastream.org/u-s-senate" },
              { lead: "L", title: "William (Bill) Redpath", detail: "Lifelong Libertarian from Findlay. Wants to abolish all tariffs, the federal Education Department, corporate welfare and farm subsidies, and to move to a multiparty system. Source: ideastream.org/u-s-senate" },
              { lead: "Other", title: "Greg Levy", detail: "Independent from the Akron area (on the ballot as an other-party candidate). Lists democracy for the working class, ending 'forever wars' and building a new economy as his priorities. Source: wtov9.com" },
            ]}
          />
        </Section>
        <Section heading="U.S. House, 13th District">
          <Rows
            rows={[
              { lead: "D", title: "Emilia Sykes", meta: "Incumbent", detail: "In Congress since 2023, on the Transportation and the Science committees. Former Ohio House minority leader; law and public-health degrees. Source: cleveland19.com (Oct 27, 2026)" },
              { lead: "R", title: "Carey Coleman", detail: "Longtime WNIR radio host in Northeast Ohio. Campaigns on fiscal discipline, border security, constitutional freedoms, support for police and parents' voice in schools. Source: cleveland19.com" },
              { lead: "Ind.", title: "Sandeep Dixit", detail: "Engineer with an MBA from Cleveland State. Campaigns on education, good jobs and affordable living. Source: cleveland19.com" },
            ]}
          />
          <Text>Under Ohio's new congressional map, Twinsburg is in the 13th District, not the 14th (thegist.vote/oh/summit-county/twinsburg).</Text>
        </Section>
      </Section>

      <Section heading="U.S. Senate race in depth" id="senate-detail">
        <Text>Why it's a special election: J.D. Vance left this seat to become vice president. Gov. Mike DeWine appointed Jon Husted on Jan 17, 2025. The winner serves the rest of the term, which ends Jan 3, 2029, and would have to run again in 2028 for a full six-year term (sparkvotes.org/ohio/races/oh-us-senate).</Text>
        <Section heading="The candidates">
          <Rows
            rows={[
              { lead: "R", title: "Jon Husted, 59", meta: "Incumbent (appointed)", detail: "Ohio House speaker 2005 to 2009, secretary of state 2011 to 2019, lieutenant governor 2019 to 2025. Adopted after time in foster care. Source: 10tv.com (AP), Sept 29, 2026" },
              { lead: "D", title: "Sherrod Brown, 73", detail: "U.S. senator 2007 to 2025, and lost re-election in 2024 to Bernie Moreno by 3.5 points. Earlier in the U.S. House, Ohio secretary of state and the Ohio House. Known for pro-labor politics. Source: 10tv.com" },
              { lead: "L", title: "Bill Redpath", detail: "CPA and chair of the Libertarian National Committee 2006 to 2010. Source: sparkvotes.org" },
              { lead: "Other", title: "Greg Levy", detail: "Akron community organizer, veteran and mover. His campaign describes him as a socialist affiliated with the Party for Socialism and Liberation. Source: sparkvotes.org" },
            ]}
          />
        </Section>
        <Section heading="Where Husted and Brown stand" caption="Summaries of each candidate's own statements and record, as reported by 10tv/AP and SparkVotes.">
          <Rows
            rows={[
              { lead: "Costs", title: "Economy, taxes, tariffs", detail: "Husted backed the 2025 federal tax law, which he calls the Working Families Tax Cuts Act: no tax on tips or overtime, a $2,200 child credit and an added senior deduction. Brown opposes that law as tilted to the wealthy, and proposes returning tariff revenue to families as rebates. Husted says tariff refunds should go to the businesses that paid them." },
              { lead: "Health", title: "Health care", detail: "Brown would fine insurers that deny care a doctor says is needed, bar drug companies from charging Americans more than other countries, and restore the enhanced ACA subsidies. Husted backs some extension of the ACA credits with conditions, such as limiting them to citizens; his SMART OTC Act on over-the-counter drug approvals became law." },
              { lead: "Border", title: "Immigration", detail: "Husted supports funding for border security and ICE enforcement. Brown called for DHS Secretary Kristi Noem to be fired and asked the administration to delay revoking legal status for Haitians in Ohio; his record also includes bills against fentanyl trafficking and for border security staffing (PolitiFact)." },
              { lead: "Abortion", title: "Abortion", detail: "Husted calls himself a 'champion for life' and spoke in a Senate hearing in favor of an in-person visit before the abortion pill mifepristone is dispensed. Brown supports abortion access and is endorsed by Planned Parenthood." },
              { lead: "Energy", title: "Energy and data centers", detail: "Husted sponsored the Ratepayer Protection Act so data centers pay for the power and grid costs they create; the Senate blocked it. Brown says data centers should pay their full utility costs and communities should decide on them, and supports capping utility rate increases." },
              { lead: "Schools", title: "Education and school funding", detail: "Husted helped create Ohio's EdChoice voucher program as House speaker, and promotes school choice and technical training such as TechCred. Brown opposes private-school vouchers, supports student-loan forgiveness and is backed by the Ohio Federation of Teachers. Neither campaign's detailed position on Title I, IDEA or the federal Education Department was found in the coverage reviewed." },
            ]}
          />
        </Section>
        <Section heading="Polls, ratings and money">
          <Rows
            rows={[
              { lead: "Poll", title: "Suffolk / USA Today, Oct 21–26", detail: "Brown 47, Husted 44. 500 likely voters, margin of error 4.4 points." },
              { lead: "Poll", title: "Echelon Insights, Oct 16–23", detail: "Brown 47, Husted 47. 508 likely voters, margin of error 5.2 points." },
              { lead: "Poll", title: "Fox News, Oct 15–19", detail: "Brown 52, Husted 47. 1,592 voters (electiontracker.live)." },
              { lead: "Poll", title: "Marist, Oct 15–18", detail: "Brown 48, Husted 44 among likely voters." },
              { lead: "Poll", title: "co/efficient, Oct 5–6", detail: "Husted 44, Brown 43, Levy 3, Redpath 1. 925 likely voters." },
              { lead: "Rating", title: "Cook, Sabato, Inside Elections, Decision Desk", detail: "All four rate it a Toss-up (as of Oct 27)." },
              { lead: "Money", title: "Campaign fundraising (FEC, via Ballotpedia)", detail: "Brown has raised $68M and Husted $20M (Reuters, Nov 2). Outside groups have spent about $237M for Republicans and $150M for Democrats (Reuters). Levy $133K, Redpath $55K (Ballotpedia)." },
            ]}
          />
          <Text>Polls and fundraising: ballotpedia.org/United_States_Senate_special_election_in_Ohio,_2026 and electiontracker.live. Polls in this race have a margin of error of about 3 to 5 points.</Text>
        </Section>
        <Section heading="Debates and controversies">
          <Rows
            rows={[
              { lead: "Debates", title: "No Husted–Brown debate", detail: "No debate was held or scheduled before Election Day (electiontracker.live, citing Axios)." },
              { lead: "Ad", title: "FirstEnergy ads against Husted", detail: "Brown and allied ads tie Husted to the House Bill 6 bribery scandal. FactCheck.org found the individual claims mostly accurate, but said that together they wrongly suggest Husted was accused of wrongdoing; he has not been charged or accused. Husted backed HB 6 and says he supported it to save nuclear plants." },
              { lead: "Ad", title: "Republican ads against Brown", detail: "PolitiFact rated False an NRSC ad tying Brown's immigration votes to a fatal I-71 crash; the victims' family objected to the ad and Husted called it a third-party ad. PolitiFact also rated False Husted's claim that Brown voted for Social Security, health care and COVID payments for people in the country illegally." },
            ]}
          />
        </Section>
      </Section>

      <Section heading="Statewide offices" id="statewide">
        <Section heading="Governor and Lieutenant Governor (open seat)">
          <Rows
            rows={[
              { lead: "R", title: "Vivek Ramaswamy / Robert A. McColley", detail: "Proposes property-tax and electric-bill relief, more nuclear power, statewide data-center standards and tougher action on Medicare fraud. Source: ideastream.org (Sept 30, 2026)" },
              { lead: "D", title: "Amy Acton / David Pepper", detail: "Physician (Dr. Acton), from Youngstown. Proposes a working-families tax cut, lower health-care and child-care costs, property-tax relief and a conditional pause on data centers. Source: ideastream.org/governor" },
              { lead: "L", title: "Don Kissick / James L. Mills", detail: "Libertarian from Ottawa, Ohio. Wants an immediate pause on new data centers, repeal of the recent gas and diesel tax increases, more local control of schools, and a public database of government contracts. Source: ideastream.org/governor" },
            ]}
          />
        </Section>
        <Section heading="Attorney General (open seat)">
          <Rows
            rows={[
              { lead: "R", title: "Keith Faber", detail: "Current state auditor and former Ohio Senate president. Priorities: cybercrime, human trafficking, elder abuse, cooperating with federal immigration enforcement, and prosecuting the House Bill 6 (FirstEnergy) case. Source: ohiocapitaljournal.com (Oct 30, 2026)" },
              { lead: "D", title: "John J. Kulewicz", detail: "Columbus-area attorney for 40 years and Upper Arlington council member. Wants to argue cases himself and be choosier about multistate lawsuits; would also pursue the House Bill 6 case. Source: ohiocapitaljournal.com" },
            ]}
          />
        </Section>
        <Section heading="Secretary of State (open seat)">
          <Rows
            rows={[
              { lead: "R", title: "Robert Sprague", detail: "Current state treasurer and former state representative. Wants photo ID for mail voting, citizenship checks before voters are added to the rolls, and no ballot drop boxes. Source: ideastream.org/secretary-of-state" },
              { lead: "D", title: "Allison Russo", detail: "State representative and former House Democratic leader. Warns that stricter ID and citizenship rules could block eligible voters; supports redistricting reform. Source: axios.com (Oct 26, 2026)" },
              { lead: "L", title: "Tom Pruss", detail: "Toledo-area business owner. Campaigns on nonpartisan, transparent elections, published election data and easier ballot access. Source: ideastream.org/secretary-of-state" },
            ]}
          />
        </Section>
        <Section heading="Auditor (open seat)">
          <Rows
            rows={[
              { lead: "R", title: "Frank LaRose", detail: "Current secretary of state, from Copley Township. Wants more performance audits and AI tools to flag fraud and waste. Sources: ideastream.org/state-auditor, axios.com" },
              { lead: "D", title: "Annette Blackwell", detail: "Mayor of Maple Heights, who led the city out of fiscal emergency; 16 years in tax and audit work. Wants the office to coach local governments to avoid financial crises. Source: ideastream.org/state-auditor" },
            ]}
          />
        </Section>
        <Section heading="Treasurer (open seat)">
          <Rows
            rows={[
              { lead: "R", title: "Jay Edwards", detail: "Former state lawmaker and House Finance Committee chair. Wants to invest more state money in local banks and expand spending transparency through Ohio Checkbook. Source: axios.com" },
              { lead: "D", title: "Seth Walsh", detail: "Cincinnati City Council member and former economic developer. Opposes data-center tax breaks and using unclaimed funds for stadiums; wants qualified, independent pension board appointees. Sources: ideastream.org/state-treasurer, axios.com" },
            ]}
          />
        </Section>
      </Section>

      <Section heading="Governor candidates on school funding" id="gov-schools" caption="The state funds a share of Twinsburg City Schools, and local levies and taxes like the one that failed in May cover much of the rest.">
        <Rows
          rows={[
            { lead: "R", title: "Vivek Ramaswamy", detail: "Wants to move away from relying on local property taxes toward expanded statewide school funding paired with property-tax relief. Won't commit to fully funding the Fair School Funding Plan at current costs, saying 'it is the law, and I'm going to respect that.' Supports EdChoice with its current income-based amounts, and wants more money in classrooms and higher starting teacher pay. Source: wkyc.com, Oct 26, 2026" },
            { lead: "D", title: "Amy Acton", detail: "Pledges to fully implement the Fair School Funding Plan, with no dollar figure given. Wants more transparency and accountability for vouchers before deciding on changes such as an income cap. Says full state funding would ease pressure on local levies. Proposes free school meals and opposes further income-tax cuts. Endorsed by both state teachers unions. Sources: wkyc.com, Oct 2, 2026; ohiocapitaljournal.com, Sept 11, 2026" },
            { lead: "L", title: "Don Kissick", detail: "Supports the goal of more equitable, predictable funding and wants to reduce and eventually eliminate reliance on property taxes after reviewing what schools need. Supports EdChoice but would look at targeting it to families with the greatest barriers. Source: ohiocapitaljournal.com, Sept 11, 2026" },
          ]}
        />
        <Text>Background: Republican lawmakers stopped phasing in the Fair School Funding Plan in the 2025 state budget, which added $226 million for schools, less than a third of what the plan's projections called for. EdChoice eligibility became near-universal in 2023, and a state appeals court has ruled the program unconstitutional; the program continues while that ruling is appealed (ohiocapitaljournal.com; wkyc.com).</Text>
      </Section>

      <Section heading="Ohio Supreme Court and Court of Appeals" id="courts">
        <Section heading="Ohio Supreme Court, term starting Jan 1, 2027">
          <Rows
            rows={[
              { lead: "R", title: "Daniel R. Hawkins", meta: "Incumbent", detail: "Sitting justice. Says judges must apply the law as written even when they disagree with the result. Source: axios.com" },
              { lead: "D", title: "Marilyn Zayas", detail: "Ohio appeals court judge in Hamilton County for about 10 years. Campaigns on stability and respect for precedent; takes no corporate money. Source: ideastream.org/ohio-supreme-court" },
            ]}
          />
        </Section>
        <Section heading="Ohio Supreme Court, term starting Jan 2, 2027">
          <Rows
            rows={[
              { lead: "D", title: "Jennifer Brunner", meta: "Incumbent", detail: "The court's only Democrat. Stresses judicial independence and fairness, and points to her work creating a felony drug court. Sources: axios.com, ideastream.org/ohio-supreme-court" },
              { lead: "R", title: "Colleen O'Donnell", detail: "Former Franklin County judge and former immigration judge. Emphasizes public safety and reading the Constitution as originally intended. Source: axios.com" },
            ]}
          />
        </Section>
        <Section heading="9th District Court of Appeals, full term starting Feb 9, 2027">
          <Rows
            rows={[
              { lead: "D", title: "Betty Sutton", meta: "Incumbent", detail: "On the court since 2021; former lawmaker. Focus: careful case review, court outreach, cheaper and faster appeals. Source: morningjournal.com (Sept 28, 2026)" },
              { lead: "R", title: "Cynthia Curtin", detail: "Hudson resident and Summit County Domestic Relations magistrate with more than 35 years as a lawyer. Wants the court to be more accessible and better understood. Source: morningjournal.com" },
            ]}
          />
        </Section>
        <Section heading="9th District Court of Appeals, unexpired term ending Feb 9, 2029">
          <Rows
            rows={[
              { lead: "R", title: "Nathan Manning", meta: "Incumbent (appointed)", detail: "Appointed in August 2026; former state representative and state senator. Focus: virtual access, court cybersecurity and improving state law. Source: morningjournal.com" },
              { lead: "D", title: "Tavia Galonski", detail: "Summit County clerk of courts and former state representative. Focus: court security, a modern case-management system, and her family and juvenile law experience. Source: morningjournal.com" },
            ]}
          />
        </Section>
      </Section>

      <Section heading="State legislature" id="legislature">
        <Section heading="Ohio Senate, District 27 (open seat)">
          <Rows
            rows={[
              { lead: "R", title: "Steve Demetriou", detail: "State representative, Army veteran and business owner from Auburn Township. Focus: affordability and tax relief; sponsored a bill ending data-center subsidies and keeping local control. Source: ideastream.org/ohio-senate-district-27" },
              { lead: "D", title: "Mike Roberto", detail: "Educator for 34 years, most recently Aurora City Schools superintendent. Focus: fully funding the Fair School Funding Plan, local control over data centers, and property-tax reform. Source: ideastream.org/ohio-senate-district-27" },
            ]}
          />
        </Section>
        <Section heading="Ohio House, District 35 (open seat)">
          <Rows
            rows={[
              { lead: "R", title: "Vik Sandhu", detail: "Twinsburg small-business owner, former merchant navy officer and former Richfield Township fiscal officer. Wants lower income taxes and capped property taxes; opposes data centers unless they pay their own way. Source: sandhuforohio.com (campaign site)" },
              { lead: "D", title: "Samantha Salamon", detail: "Northfield Center attorney and chief counsel at Asian Services In Action, a nonprofit serving victims of domestic violence and human trafficking. Source: ballotpedia.org/Samantha_Salamon" },
            ]}
          />
        </Section>
      </Section>

      <Section heading="Summit County Council" id="county">
        <Section heading="Council at large: vote for up to 3 of 6">
          <Rows
            rows={[
              { lead: "D", title: "Erin Dickinson", meta: "Incumbent", detail: "Council president, on council since 2022; business litigation attorney. Top priority: meeting residents' needs while handling state and federal cuts. Source: signalakron.org" },
              { lead: "D", title: "Elizabeth Walters", meta: "Incumbent", detail: "On county council since 2016. Top priority: protecting services through federal and state cuts. Source: signalakron.org" },
              { lead: "D", title: "John A. Donofrio", meta: "Sitting council member", detail: "Listed as a current council member in a Signal Akron endorsement list; he did not answer Signal Akron's questionnaire. Source: signalakron.org" },
              { lead: "R", title: "Jonathon D. Bollas", detail: "Tallmadge Ward 3 councilman and former council president; IT project manager. Focus: affordability, infrastructure, public safety. Source: signalakron.org" },
              { lead: "R", title: "Shane R. Barker", detail: "Macedonia City Council member for 9-plus years; law enforcement officer for more than 30 years. Source: signalakron.org" },
              { lead: "R", title: "John Chapman", detail: "Cuyahoga Falls resident. He did not answer Signal Akron's questionnaire, and no background was found. Source: county candidate list" },
            ]}
          />
          <Text>No other county offices (executive, prosecutor, sheriff, fiscal officer) are on this year's ballot (boe.ohio.gov/summit/c/upload/Election_CandidateList.pdf).</Text>
        </Section>
      </Section>

      <Section heading="Summit County judges" id="judges" caption="Judges in these races are listed without party. Backgrounds are from Signal Akron's candidate questionnaire unless noted.">
        <Section heading="Common Pleas, General Division (6 seats)">
          <Rows
            rows={[
              { lead: "Jan 2", title: "Tammy O'Brien (incumbent) vs. Tania Nemer", detail: "O'Brien: judge since 2011, rated Excellent by the Akron Bar. Nemer: former federal immigration judge and magistrate; now a deputy chief in the county prosecutor's office." },
              { lead: "Jan 3", title: "Kelly L. McLaughlin (incumbent, unopposed)", detail: "Judge since 2018; former Domestic Relations chief magistrate." },
              { lead: "Jan 5", title: "Alison McCarty (incumbent) vs. Job Esau Perry", detail: "McCarty: judge since 2009 and the court's administrative judge; former prosecutor. Perry: trial attorney since 2005, magistrate since 2024, former Akron school board member." },
              { lead: "Jan 6", title: "Mary Margaret Rowlands (incumbent) vs. Kate A. Makra", detail: "Rowlands: judge since 2009 and runs a re-entry court. Makra did not answer Signal Akron's questionnaire; no background found." },
              { lead: "Feb 9", title: "Christine L. Croce (incumbent) vs. John Galonski", detail: "Croce: judge since 2013; former prosecutor and Barberton Municipal judge. Galonski: chief assistant prosecutor, civil division." },
              { lead: "May", title: "Joy Malek Oldfield (incumbent) vs. Joe Darwal", detail: "Oldfield: judge since 2016 and presides over the felony drug court. Darwal did not answer Signal Akron's questionnaire; no background found." },
            ]}
          />
        </Section>
        <Section heading="Juvenile, Domestic Relations and Probate">
          <Rows
            rows={[
              { lead: "Juvenile", title: "Amy Corrigall Jones vs. David Lombardi", detail: "Jones: Common Pleas judge 2012 to 2022, founded the Valor Veterans Court, now a county executive liaison. Lombardi did not answer Signal Akron's questionnaire; no background found." },
              { lead: "Dom. Rel.", title: "Katarina Cook (incumbent) vs. Lisa Dean", detail: "Cook: judge on this court since 2017, now its administrative judge. Dean: family-law attorney for 25-plus years and Green's elected law director." },
              { lead: "Probate", title: "Steve Elliott vs. Diana Stevenson", detail: "Elliott: the probate court's chief magistrate; former CIA officer and parole officer. Stevenson: Barberton Municipal Court judge, formerly a probate magistrate for 12 years." },
            ]}
          />
          <Text>Full answers: signalakron.org/election-2026-voter-guide-midterm-summit-county-judge-candidates</Text>
        </Section>
      </Section>

      <Section heading="Key topics side by side" id="topics" caption="Each row is one race: R = Republican, D = Democrat, L = Libertarian. Stances are summarized from the cited sources. 'Not found' means no stance turned up in the sources reviewed.">
        <Section heading="Who controls what">
          <Rows
            rows={[
              { lead: "U.S. Senate", title: "Republicans hold 53 of 100 seats", detail: "Democrats need a net gain of at least 4 seats to take control, and Ohio is one of the seats they are targeting. In a 50-50 Senate, Vice President Vance breaks ties, so Republicans would keep control. Source: Reuters (Nov 2, 2026)" },
              { lead: "Ohio House", title: "65 Republicans, 34 Democrats", detail: "It takes 60 votes to override a governor's veto, so Democrats would need to flip 6 seats to end the Republican supermajority. House District 35 (Twinsburg) is one of their top 8 targets. Source: ohiocapitaljournal.com (July 24, 2026)" },
              { lead: "Ohio Senate", title: "24 Republicans, 9 Democrats", detail: "Republicans also have a veto-proof majority here. District 27 is an open seat that Signal Ohio calls the state's most competitive Senate district. Sources: wvxu.org, signalohio.org" },
              { lead: "Maps", title: "Ohio Redistricting Commission: 5 Republicans, 2 Democrats", detail: "The governor, secretary of state and auditor sit on it with 4 legislative leaders. A Democratic governor plus a Democratic secretary of state or auditor would make it 4-3 Democratic, which matters for the maps drawn after the 2030 census. Source: wvxu.org (Jan 21, 2026)" },
              { lead: "Courts", title: "Ohio Supreme Court: 6 Republicans, 1 Democrat (Brunner)", detail: "Republicans have won all 6 races since party labels were added to the ballot in 2021. If both Republicans win this year, the court would be all Republican. The next justices will decide cases on the 2023 abortion amendment and on EdChoice. Source: signalohio.org (Oct 27, 2026)" },
            ]}
          />
        </Section>
        <Section heading="Abortion access">
          <Text>Background: In 2023, Ohio voters passed Issue 1, 57% to 43%. It put in the Ohio Constitution the right to make your own decisions on abortion, contraception, fertility treatment, miscarriage care and continuing a pregnancy. Abortion can generally be restricted after viability, which is about 22 weeks, judged case by case. Some lawmakers have since proposed a total ban, an end to mail-order abortion pills and a 24-hour waiting period; none has passed both chambers. The state is still in court trying to enforce parts of Ohio's six-week ban, and the governor can sign or veto new limits (ohiocapitaljournal.com, Oct 28, 2026).</Text>
          <Rows
            rows={[
              { lead: "Senate", title: "R Husted: calls himself a 'champion for life.' D Brown: supports abortion access.", detail: "Husted supports an in-person doctor visit before the abortion pill is dispensed. Husted is endorsed by Ohio Right to Life; Brown by Planned Parenthood. Sources: 10tv.com (AP), ohiolife.org" },
              { lead: "Governor", title: "R Ramaswamy: 'unapologetically pro-life' (2023). D Acton: 'I do believe in choice.' L Kissick: opposes abortion but no new restrictions.", detail: "Ramaswamy opposed Issue 1. This year he has stressed funding crisis-pregnancy centers and has not detailed whether he'd sign new limits. Acton says she would not support further restrictions. Kissick's running mate says the governor should 'respect the will of the voters.' Endorsements: Ohio Right to Life backs Ramaswamy; Planned Parenthood backs Acton. Sources: ohiocapitaljournal.com, ohiolife.org, plannedparenthoodaction.org" },
              { lead: "AG", title: "R Faber: endorsed by Ohio Right to Life. D Kulewicz: endorsed by Planned Parenthood.", detail: "The attorney general defends state abortion laws in court. Neither candidate's own statement on abortion was found. Sources: ohiolife.org, plannedparenthoodaction.org" },
              { lead: "SoS / Auditor", title: "Sprague and LaRose: endorsed by Ohio Right to Life. Russo and Blackwell: endorsed by Planned Parenthood.", detail: "Russo supported the 2023 amendment. LaRose led the August 2023 Issue 1 effort to raise the vote needed to amend the constitution to 60%, three months before the abortion amendment vote. Sources: thegist.vote, crackedbuckeye.com, ohiolife.org, plannedparenthoodaction.org" },
              { lead: "Treasurer", title: "D Walsh: endorsed by Planned Parenthood. R Edwards: not on Ohio Right to Life's list.", detail: "Source: plannedparenthoodaction.org, ohiolife.org" },
              { lead: "Supreme Court", title: "R Hawkins and O'Donnell: endorsed by Ohio Right to Life. D Zayas and Brunner: endorsed by Planned Parenthood.", detail: "Judges don't campaign on how they'd rule, but this court will hear the cases over Ohio's abortion laws. Sources: ohiolife.org, plannedparenthoodaction.org, signalohio.org" },
              { lead: "Ohio Senate 27", title: "R Demetriou: endorsed by Ohio Right to Life. D Roberto: supports abortion rights under the Ohio Constitution, and IVF access.", detail: "Sources: ohiolife.org, thegist.vote" },
              { lead: "Ohio House 35", title: "R Sandhu: endorsed by Ohio Right to Life. D Salamon: endorsed by Planned Parenthood.", detail: "Neither candidate's own statement was found. Sources: ohiolife.org, plannedparenthoodaction.org" },
            ]}
          />
        </Section>
        <Section heading="Insurance paying for needed care">
          <Rows
            rows={[
              { lead: "D Brown", title: "Would ban insurers from denying care a patient's doctor says is needed, and fine insurers that wrongly deny claims", detail: "This is a campaign pledge: 'It's time to ban health insurance companies from denying the care your doctor says you need. And if they try to deny your claims, we'll fine them.' No bill text, enforcement details or prior-authorization rules were found. It is not a surprise-billing or new mandated-coverage law. He also wants to restore the expanded ACA subsidies and stop drug companies from charging Americans more than other countries. His campaign says Husted voted against two bipartisan amendments on insurers denying or delaying care (a campaign claim, not independently checked). Sources: sherrodbrown.com/our-fight, sherrodbrown.com (June 9, 2026), 10tv.com" },
              { lead: "R Husted", title: "Backs extending ACA tax credits with conditions, such as limiting them to citizens", detail: "His SMART OTC Act, on approving over-the-counter drugs, became law. No Husted plan on insurer denials was found. Source: 10tv.com (AP)" },
              { lead: "Governor", title: "D Acton proposes lowering health-care costs.", detail: "No specific insurer-denial plan from any governor candidate was found. Source: ideastream.org/governor" },
            ]}
          />
        </Section>
        <Section heading="Taxes (income and property)">
          <Rows
            rows={[
              { lead: "Senate", title: "R Husted: backed the 2025 federal tax law (no tax on tips or overtime, larger child credit, senior deduction). D Brown: opposes it as tilted to the wealthy.", detail: "Brown would return tariff money to families as rebates. Source: 10tv.com (AP)" },
              { lead: "Governor", title: "R Ramaswamy: property-tax and electric-bill relief. D Acton: working-families tax cut, property-tax relief, no further income-tax cuts. L Kissick: reduce and eventually end reliance on property taxes.", detail: "Sources: ideastream.org, wkyc.com, ohiocapitaljournal.com" },
              { lead: "Treasurer", title: "R Edwards: signed petitions to abolish property taxes. D Walsh: no tax plan (the treasurer doesn't set taxes).", detail: "Source: crackedbuckeye.com" },
              { lead: "Ohio Senate 27", title: "R Demetriou: voted for HB 186 (caps school property-tax growth at inflation) and the 2025 budget's flat income tax. D Roberto: property-tax relief for seniors and those in need; more state school funding.", detail: "Sources: thegist.vote, ohiohouse.gov, buckeyeblueprint.com" },
              { lead: "Ohio House 35", title: "R Sandhu: lower state income tax; cap property taxes. D Salamon: fund schools while easing property taxes.", detail: "Source: thegist.vote" },
              { lead: "Issue 38", title: "Rezoning only, with no tax.", detail: "Source: boe.ohio.gov issue synopsis" },
            ]}
          />
        </Section>
        <Section heading="Security and public safety">
          <Rows
            rows={[
              { lead: "Senate", title: "R Husted: more border-security and ICE funding. D Brown: called for the DHS secretary to be fired; has sponsored anti-fentanyl and border-staffing bills.", detail: "Sources: 10tv.com (AP), PolitiFact" },
              { lead: "AG", title: "Both would help with federal immigration enforcement. R Faber calls local and federal cooperation 'key.' D Kulewicz would comply, but it wouldn't be his top priority.", detail: "Both would carry out the death penalty and keep prosecuting FirstEnergy. Both want guardrails on Flock license-plate cameras; Kulewicz would require a warrant for data older than 48 hours. Faber has strong police-union backing. Source: ohiocapitaljournal.com (Nov 2, 2026)" },
              { lead: "Supreme Court", title: "R O'Donnell: former immigration judge who denied all 16 asylum requests she heard; backed by police groups. D Brunner: backed by most unions.", detail: "Source: signalohio.org" },
              { lead: "Issue 3", title: "Puts photo ID to vote into the Ohio Constitution.", detail: "Ohio already requires photo ID at the polls under state law. Source: boe.ohio.gov issue synopsis" },
              { lead: "Ohio Senate 27", title: "D Roberto: universal background checks, red-flag laws and stronger hate-crime laws. R Demetriou: no public-safety platform was found in the sources reviewed.", detail: "Source: thegist.vote" },
            ]}
          />
        </Section>
        <Section heading="Public school funding (short version)">
          <Text>Senate: Husted helped create EdChoice; Brown opposes vouchers. Governor: Acton pledges to fully fund the Fair School Funding Plan; Ramaswamy won't commit to it at current costs and keeps EdChoice; Kissick would target EdChoice. Ohio Senate 27: Roberto backs full state funding; Demetriou supports school choice and voted to end several school levy types. Ohio House 35: Salamon backs school funding with property-tax relief; no Sandhu position was found. Details are in the governor and down-ballot sections.</Text>
        </Section>
      </Section>

      <Section heading="Down-ballot races: records and ratings" id="downballot" caption="Records, votes and bar ratings for each down-ballot race, in addition to the candidate notes above. This section has facts only, no recommendations.">
        <Section heading="Attorney General">
          <Rows
            rows={[
              { lead: "R", title: "Keith Faber", detail: "State auditor since 2019; earlier Ohio Senate president. His office reported billions of dollars in fraud and improper payments in Ohio's pandemic unemployment system. A 2018 AP investigation found property-tax delinquencies by Faber and his businesses. In 2022 he floated an unproven theory about Cuyahoga County ballot paper, which county officials disputed. Says he'll review the FirstEnergy (HB 6) case files before deciding how to proceed. Sources: crackedbuckeye.com, thegist.vote" },
              { lead: "D", title: "John J. Kulewicz", detail: "Upper Arlington council member since 2020; no statewide record. Filed an ethics complaint about JobsOhio in June 2026. Says he would sign on to the January HB 6 trial, and would go after price-fixing, robocallers, Medicaid fraud and public corruption. Sources: crackedbuckeye.com, thegist.vote" },
            ]}
          />
        </Section>
        <Section heading="Secretary of State (runs elections)">
          <Rows
            rows={[
              { lead: "R", title: "Robert Sprague", detail: "State treasurer since 2019. Wants photo ID for mail voting, no drop boxes, citizenship checks using federal data, auditable paper ballots and bipartisan post-election reviews. A 2026 campaign ad about drop boxes featured a cartoon character called 'Lefty the Cheat.' Sources: thegist.vote, crackedbuckeye.com" },
              { lead: "D", title: "Allison Russo", detail: "State representative and former House Democratic leader. Voted against putting Issue 3 (photo ID) on the ballot, and against the 2025 state budget. Wants drop boxes at every polling place, plain nonpartisan ballot language and more money for county election boards. Sources: crackedbuckeye.com, thegist.vote" },
              { lead: "L", title: "Tom Pruss", detail: "Printing business owner; no office record. Wants fewer petition hurdles, open election data and no last-minute rule changes. Source: thegist.vote" },
            ]}
          />
        </Section>
        <Section heading="Auditor (audits local governments and schools)">
          <Rows
            rows={[
              { lead: "R", title: "Frank LaRose", detail: "Secretary of state since 2019; state senator before that. Created the office's Public Integrity Division and referred 162 campaign-finance violations by former Speaker Householder and others for possible prosecution. Led the August 2023 Issue 1 effort to raise the vote needed to amend the constitution. Pledges to hold local governments accountable for their spending. Sources: crackedbuckeye.com, thegist.vote" },
              { lead: "D", title: "Annette Blackwell", detail: "Mayor of Maple Heights since 2016. The city got out of state fiscal emergency in 2020 and won the Auditor of State's Clean Audit Award from 2021 to 2023. Wants the office to do more outreach and partner with local governments. Sources: crackedbuckeye.com, thegist.vote" },
            ]}
          />
        </Section>
        <Section heading="Treasurer (manages state money)">
          <Rows
            rows={[
              { lead: "R", title: "Jay Edwards", detail: "Former House Finance Committee chair. He voted for HB 6 in 2019, attended a 2019 dinner with Householder where undercover FBI agents were present, voted against expelling Householder in 2021, and routinely deleted his text messages, including ones with Householder. He was never charged. His campaign says he sponsored the 2023 budget, with its $3.2 billion tax cut and universal EdChoice expansion. He has signed petitions to abolish property taxes. Sources: crackedbuckeye.com, thegist.vote" },
              { lead: "D", title: "Seth Walsh", detail: "Cincinnati council member since 2022. In 2023 a former aide filed an ethics complaint; the city ethics office found insufficient evidence that city resources were used for campaigning, and the city paid her a $30,000 settlement. Wants to put more state deposits in Ohio community banks and opposes using unclaimed funds for a Browns stadium. Sources: crackedbuckeye.com, thegist.vote" },
            ]}
          />
          <Text>Fundraising through Sept 3, 2026: Edwards raised $845K, Walsh $448K (Ohio SOS filings, via crackedbuckeye.com).</Text>
        </Section>
        <Section heading="Ohio Supreme Court: bar ratings" caption="The Ohio State Bar Association does not rate candidates; it publishes profiles at judicialvotescount.org. These ratings come from Cleveland-area legal groups, through Judge4Yourself.">
          <Rows
            rows={[
              { lead: "Seat 1", title: "Hawkins (R, incumbent) vs. Zayas (D)", detail: "Hawkins: Satisfactory (Cleveland Metropolitan Bar), Satisfactory (Cuyahoga Criminal Defense Lawyers), Not Recommended (Norman S. Minor Bar). Zayas: Excellent, Excellent, Good. The Ohio Prosecuting Attorneys Association did not rate either. Source: judge4yourself.com" },
              { lead: "Seat 2", title: "Brunner (D, incumbent) vs. O'Donnell (R)", detail: "Brunner: Excellent from all three groups. O'Donnell: Satisfactory (Cleveland Metropolitan Bar), Not Recommended (Cuyahoga Criminal Defense Lawyers), Good (Norman S. Minor Bar). Source: judge4yourself.com" },
            ]}
          />
          <Text>A Geauga County Bar member poll (48 ballots) rated Hawkins, Zayas and O'Donnell Not Recommended and Brunner Minimally Qualified (geaugabar.org). On Oct 15, a state appeals court ruled EdChoice unconstitutional. The program stays in place while an appeal is expected, and the Ohio Supreme Court is the next level up (edweek.org).</Text>
        </Section>
        <Section heading="9th District Court of Appeals: Akron Bar ratings">
          <Rows
            rows={[
              { lead: "Full term", title: "Sutton (D, incumbent): Good. Curtin (R): Adequate.", detail: "Source: akronbar.org" },
              { lead: "Unexpired", title: "Manning (R, appointed incumbent): Good. T. Galonski (D): Good.", detail: "Source: akronbar.org" },
            ]}
          />
        </Section>
        <Section heading="Ohio Senate 27: votes on property taxes and schools">
          <Rows
            rows={[
              { lead: "R", title: "Steve Demetriou (state representative)", detail: "Voted for the 2025 state budget (HB 96), which added school funding and property-tax relief but did not fully fund the Fair School Funding Plan. He also voted to override the governor's veto of the budget item that, starting in 2026, ended replacement, emergency, substitute and certain other school and local levy types. Voted for HB 186, which caps growth in school property taxes at inflation. Americans for Prosperity says he 'championed parental empowerment and school choice,' including supporting the Backpack Bill. No separate EdChoice vote was found. Sources: legislature.ohio.gov HB 96 votes, squirepattonboggs.com, ohiohouse.gov, thegist.vote, buckeyeblueprint.com" },
              { lead: "D", title: "Mike Roberto (retired Aurora superintendent)", detail: "No legislative record. Pledges to fully fund public schools and criticizes the state for not funding the Fair School Funding Plan: 'But they do have $2 billion set aside for private schools.' Backs property-tax relief for seniors and those in need. Sources: thegist.vote, signalohio.org" },
            ]}
          />
        </Section>
        <Section heading="Ohio House 35 (open seat)">
          <Rows
            rows={[
              { lead: "R", title: "Vik Sandhu", detail: "No legislative record. Wants a lower state income tax, reformed and capped property taxes, fewer small-business regulations and cuts to wasteful state spending. No EdChoice or school-funding position was found. Source: thegist.vote (from sandhuforohio.com)" },
              { lead: "D", title: "Samantha Salamon", detail: "No legislative record. Says she'll focus on 'appropriate funding for public schools, while also alleviating property tax burdens.' No EdChoice position was found in the sources we could open. Source: thegist.vote (from Ballotpedia)" },
            ]}
          />
        </Section>
        <Section heading="Summit County Council at large">
          <Text>The Gist found no documented policy positions from any of the six candidates. Backgrounds: Dickinson (D, incumbent, council president, attorney); Walters (D, incumbent since 2016); Donofrio (D, incumbent, retired county fiscal officer); Barker (R, retired sheriff's office captain, Macedonia council); Bollas (R, Tallmadge council, IT project manager); Chapman (R, Cuyahoga Falls attorney). Sources: thegist.vote, signalakron.org</Text>
        </Section>
        <Section heading="Summit County judges: Akron Bar ratings" caption="The Akron Bar rates candidates Excellent, Good, Adequate or Not Acceptable, based on integrity, legal knowledge, experience, temperament, diligence, personal responsibility and service. Ratings are not endorsements.">
          <Rows
            rows={[
              { lead: "Jan 2", title: "O'Brien (inc.): Excellent. Nemer: Good." },
              { lead: "Jan 3", title: "McLaughlin (inc.): unopposed" },
              { lead: "Jan 5", title: "McCarty (inc.): Excellent. Perry: Good." },
              { lead: "Jan 6", title: "Rowlands (inc.): Excellent. Makra: Not Acceptable." },
              { lead: "Feb 9", title: "Croce (inc.): Excellent. J. Galonski: Good." },
              { lead: "May 1", title: "Oldfield (inc.): Excellent. Darwal: Adequate." },
              { lead: "Juvenile", title: "Corrigall Jones: Excellent. Lombardi: Good.", detail: "In 2018, a commission of judges upheld a $1,200 fine against David Gussler Lombardi, then a Common Pleas candidate, because his campaign literature did not make 'elect' and 'for' prominent before the word 'judge' (supremecourt.ohio.gov, Case 2018-1576)." },
              { lead: "Dom. Rel.", title: "Cook (inc.): Excellent. Dean: Good." },
              { lead: "Probate", title: "Elliott: Excellent. Stevenson: Excellent.", detail: "Open seat. Elliott is the probate court's chief magistrate; Stevenson is a Barberton Municipal judge and former probate magistrate." },
            ]}
          />
          <Text>Source: akronbar.org (General, Domestic Relations, Juvenile, Probate and Ninth District pages). A search of Ohio disciplinary records turned up no other actions against these candidates.</Text>
        </Section>
      </Section>

      <Section heading="Voting on Tuesday" id="practical">
        <Properties
          items={[
            { label: "Date", value: "Tuesday, November 3, 2026" },
            { label: "Polls open", value: "6:30 AM to 7:30 PM Eastern (boe.ohio.gov/summit)" },
            { label: "Photo ID", value: "Required. Bring an unexpired photo ID with your name: Ohio driver license, state ID or BMV interim ID, U.S. passport or passport card, U.S. military or military dependent ID, Ohio National Guard ID, or VA ID. An Ohio license showing a former address is acceptable. (ballotpedia.org/Voting_in_Ohio)" },
            { label: "Polling place", value: "Not confirmed here. The county's lookup could not be loaded for this research. Look up your address at lookup.boe.ohio.gov/vtrapp/summit/pollfinder.aspx or call the Board of Elections at 330-643-5200. Reported Election Day location changes were in Copley, New Franklin, Northfield Center and Stow, not Twinsburg." },
            { label: "Absentee ballots", value: "Must be received by the Board of Elections by 7:30 PM on Election Day. Early in-person voting ended Nov 1." },
            { label: "Board of Elections", value: "1050 E. Tallmadge Ave, Akron. 330-643-5200." },
          ]}
        />
      </Section>

      <Section heading="Sources" id="sources">
        <LinkCards
          links={[
            { title: "Official candidate list, Nov 3, 2026", site: "Summit County Board of Elections", href: "https://www.boe.ohio.gov/summit/c/upload/Election_CandidateList.pdf" },
            { title: "Issue synopsis, Nov 3, 2026", site: "Summit County Board of Elections", href: "https://www.boe.ohio.gov/summit/c/upload/Election_60IssueSynopsis.pdf" },
            { title: "Election info and poll hours", site: "Summit County Board of Elections", href: "https://www.boe.ohio.gov/summit/" },
            { title: "Polling place lookup by address", site: "Summit County Board of Elections", href: "https://lookup.boe.ohio.gov/vtrapp/summit/pollfinder.aspx" },
            { title: "City of Twinsburg ballot and districts", site: "The Gist", href: "https://thegist.vote/oh/summit-county/twinsburg" },
            { title: "Issue 38: Twinsburg rezoning", site: "The Gist", href: "https://thegist.vote/question/2026-general-oh/summit-twinsburg-post-road-rezoning" },
            { title: "Summit County-area issues on the Nov 3 ballot", site: "Signal Akron", href: "https://signalakron.org/election-2026-voter-guide-summit-county-area-issues-taxes-levies/" },
            { title: "Summit County judge and council candidates", site: "Signal Akron", href: "https://signalakron.org/election-2026-voter-guide-midterm-summit-county-judge-candidates/" },
            { title: "Governor voter guide", site: "Ideastream", href: "https://www.ideastream.org/governor" },
            { title: "Governor candidates on data centers and costs", site: "Ideastream", href: "https://www.ideastream.org/government-politics/2026-09-30/watch-ohios-3-candidates-for-governor-weigh-in-on-data-centers-cost-of-living-and-more" },
            { title: "U.S. Senate voter guide", site: "Ideastream", href: "https://www.ideastream.org/u-s-senate" },
            { title: "Husted, Brown, Redpath and Levy vie for Senate seat", site: "WTOV9", href: "https://wtov9.com/news/election/ohio-senate-race-jon-husted-sherrod-brown-bill-redpath-greg-levy-libertarian-party-independent-candidate-us-senate-election-day-campaign-advertising-affordability-inflation-tariffs-economy-tax-cuts-working-family-tax-cut-jobs-unemployment-data-centers-ea" },
            { title: "Ohio Senate special election: polls, ratings, finance", site: "Ballotpedia", href: "https://ballotpedia.org/United_States_Senate_special_election_in_Ohio,_2026" },
            { title: "Compare the Senate candidates", site: "SparkVotes", href: "https://www.sparkvotes.org/ohio/races/oh-us-senate/" },
            { title: "Where Husted and Brown stand on key issues", site: "10tv / AP", href: "https://www.10tv.com/article/news/politics/elections/ohio-us-senate-race-2026-jon-husted-sherrod-brown/530-2bf46b68-a2a3-425d-9c44-2a655c74bd60" },
            { title: "Brown vs. Husted in the final stretch", site: "Election Tracker Live", href: "https://electiontracker.live/blog/ohio-senate-brown-husted-final-stretch-2026.html" },
            { title: "Democratic ads connect Husted to bribery scandal", site: "FactCheck.org", href: "https://www.factcheck.org/2026/09/ohio-democratic-ads-connect-husted-to-bribery-scandal-despite-no-charges-of-wrongdoing/" },
            { title: "No evidence Brown's votes caused fatal crash", site: "PolitiFact", href: "https://politifact.com/factchecks/2026/sep/01/national-republican-senatorial-committee/theres-no-evidence-sherrod-browns-immigration-votes-caused-a-fatal-ohio-crash/" },
            { title: "Husted's claim about Brown and benefits", site: "PolitiFact", href: "https://politifact.com/factchecks/2026/aug/25/jon-husted/sherrod-brown-immigration-ohio-senate/" },
            { title: "Ramaswamy's education plan", site: "WKYC", href: "https://www.wkyc.com/article/news/education/education-station/vivek-ramaswamy-outlines-education-plan-ohio-one-on-one-interview-3news-danielle-wiggins-education-station/95-f3401685-2f35-4248-9afe-56b59004f928" },
            { title: "Acton's education plan", site: "WKYC", href: "https://www.wkyc.com/article/news/education/education-station/amy-acton-outlines-education-plan-ohio-one-on-one-interview-3news-danielle-wiggins-education-station/95-430b698a-46d3-47b5-a363-752bdb4ff7ad" },
            { title: "Governor candidates on education", site: "Ohio Capital Journal", href: "https://ohiocapitaljournal.com/2026/09/11/ohio-governor-race-where-amy-acton-and-vivek-ramaswamy-stand-on-education-issues/" },
            { title: "2026 judicial ratings: Common Pleas and Appeals", site: "Akron Bar Association", href: "https://www.akronbar.org/?pg=GeneralDivision" },
            { title: "Ninth District Court of Appeals ratings", site: "Akron Bar Association", href: "https://www.akronbar.org/?pg=NinthDistrictCourtofAppeals" },
            { title: "Juvenile, Domestic Relations and Probate ratings", site: "Akron Bar Association", href: "https://www.akronbar.org/?pg=CourtofCommonPleasProbateDivision" },
            { title: "Ohio Supreme Court candidate ratings", site: "Judge4Yourself", href: "https://www.judge4yourself.com/judicial-candidate-ratings/" },
            { title: "Bar poll, Nov 3, 2026", site: "Geauga County Bar Association", href: "https://www.geaugabar.org/bar-poll.html" },
            { title: "Judicial campaign complaint, Case 2018-1576", site: "Supreme Court of Ohio", href: "https://www.supremecourt.ohio.gov/rod/docs/PDF/0/2018/2018-Ohio-5173.pdf" },
            { title: "Attorney General candidates, record and money", site: "Cracked Buckeye", href: "https://crackedbuckeye.com/election/2026/attorney-general/" },
            { title: "Secretary of State candidates, record and money", site: "Cracked Buckeye", href: "https://crackedbuckeye.com/election/2026/secretary-of-state/" },
            { title: "Auditor candidates, record and money", site: "Cracked Buckeye", href: "https://crackedbuckeye.com/election/2026/auditor/" },
            { title: "Treasurer candidates, record and money", site: "Cracked Buckeye", href: "https://crackedbuckeye.com/election/2026/treasurer/" },
            { title: "Ohio Senate District 27 positions", site: "The Gist", href: "https://thegist.vote/race/2026-general-oh/oh-senate-27-full-term-commencing-1-1-2027" },
            { title: "Ohio House District 35 positions", site: "The Gist", href: "https://thegist.vote/race/2026-general-oh/oh-house-35" },
            { title: "Summit County Council at large", site: "The Gist", href: "https://thegist.vote/race/2026-general-oh/oh-summit-council-at-large-full-term-commencing-1-1-2027" },
            { title: "House Bill 96 votes", site: "Ohio Legislature", href: "https://www.legislature.ohio.gov/legislation/136/hb96/votes" },
            { title: "Budget veto override on levy types", site: "Squire Patton Boggs", href: "https://www.squirepattonboggs.com/insights/publications/property-tax-reform-update-senate-votes-to-override-governor-veto-and-other-happenings/" },
            { title: "Demetriou on the 2025 budget", site: "Ohio House", href: "https://ohiohouse.gov/news/democratic/rep-demetriou-votes-on-budget-plan-that-delivers-historic-property-tax-relief-for-ohioans-implements-flat-tax-135085" },
            { title: "Endorsement of Demetriou", site: "AFP Ohio", href: "https://buckeyeblueprint.com/economic-progress/endorsement-steve-demetriou-for-ohio-senate-district-27/" },
            { title: "Educators running for the Statehouse", site: "Signal Ohio", href: "https://signalohio.org/these-ohio-educators-were-fed-up-democrats-recruited-them-to-run-for-the-statehouse-election-2026/" },
            { title: "The races that will decide control of the US Senate", site: "Reuters via Yahoo", href: "https://www.yahoo.com/news/politics/articles/factbox-races-decide-control-us-100635328.html" },
            { title: "Dems need to flip 6 seats to break the supermajority", site: "Ohio Capital Journal", href: "https://ohiocapitaljournal.com/2026/07/24/dems-need-to-flip-6-seats-to-break-the-republican-statehouse-supermajority-and-northeast-ohio-is-pivotal/" },
            { title: "Ohio Democrats and the Redistricting Commission", site: "WVXU", href: "https://www.wvxu.org/politics/2026-01-21/analysis-ohio-democrats-2030-gop-control-legislature" },
            { title: "Is Ohio on the cusp of an all-Republican Supreme Court?", site: "Signal Ohio", href: "https://signalohio.org/is-ohio-on-the-cusp-of-an-all-republican-state-supreme-court/" },
            { title: "Where the governor candidates stand on abortion", site: "Ohio Capital Journal", href: "https://ohiocapitaljournal.com/2026/10/28/where-ohios-candidates-for-governor-stand-on-abortion/" },
            { title: "Where the AG candidates stand on Flock and ICE", site: "Ohio Capital Journal", href: "https://ohiocapitaljournal.com/2026/11/02/where-the-candidates-for-ohio-attorney-general-stand-on-flock-ice/" },
            { title: "2026 general election recommendations", site: "Ohio Right to Life PAC", href: "https://ohiolife.org/ohio-right-to-life-pac-announces-2026-general-election-candidate-recommendations/" },
            { title: "2026 endorsements", site: "Planned Parenthood Advocates of Ohio", href: "https://www.plannedparenthoodaction.org/planned-parenthood-advocates-ohio/elections" },
            { title: "Brown's issue page (insurance denials)", site: "sherrodbrown.com", href: "https://www.sherrodbrown.com/our-fight/" },
            { title: "Brown campaign release on insurer denials", site: "sherrodbrown.com", href: "https://www.sherrodbrown.com/2026/06/09/jon-husted-blocks-efforts-to-crack-down-on-insurance-companies-denying-ohioans-health-care/" },
            { title: "Court declares EdChoice unconstitutional", site: "Education Week", href: "https://www.edweek.org/policy-politics/court-declares-ohio-school-choice-voucher-program-unconstitutional/2026/10" },
            { title: "Sykes, Coleman, Dixit in the 13th District", site: "Cleveland 19", href: "https://www.cleveland19.com/2026/10/27/democrat-sykes-faces-republican-coleman-independent-dixit-ohios-competitive-13th-district/" },
            { title: "What's at stake in Ohio's statewide races", site: "Axios", href: "https://www.axios.com/local/cincinnati/2026/10/26/ohio-2026-election-auditor-attorney-general-treasurer-supreme-court-secretary-state" },
            { title: "Attorney general race", site: "Ohio Capital Journal", href: "https://ohiocapitaljournal.com/2026/10/30/race-for-ohio-attorney-general-pits-longtime-state-leader-against-attorney-hoping-for-change/" },
            { title: "Secretary of State voter guide", site: "Ideastream", href: "https://www.ideastream.org/secretary-of-state" },
            { title: "State Auditor voter guide", site: "Ideastream", href: "https://www.ideastream.org/state-auditor" },
            { title: "State Treasurer voter guide", site: "Ideastream", href: "https://www.ideastream.org/state-treasurer" },
            { title: "Ohio Supreme Court voter guide", site: "Ideastream", href: "https://www.ideastream.org/ohio-supreme-court" },
            { title: "Ninth District Court of Appeals races", site: "Morning Journal", href: "https://www.morningjournal.com/2026/09/28/election-2026-two-seats-on-ninth-district-court-of-appeals-to-be-decided-in-november/" },
            { title: "Ohio Senate District 27 voter guide", site: "Ideastream", href: "https://www.ideastream.org/ohio-senate-district-27" },
            { title: "Vik Sandhu campaign site", site: "sandhuforohio.com", href: "https://sandhuforohio.com/" },
            { title: "Samantha Salamon", site: "Ballotpedia", href: "https://ballotpedia.org/Samantha_Salamon" },
            { title: "Voting in Ohio (photo ID)", site: "Ballotpedia", href: "https://ballotpedia.org/Voting_in_Ohio" },
            { title: "Twinsburg voters say no to school levy (May 2026)", site: "Cleveland Jewish News", href: "https://www.clevelandjewishnews.com/news/politics/elections/twinsburg-voters-say-no-to-school-levy/article_7cadf540-c09e-4c36-9345-b36b1c24d358.html" },
            { title: "Twinsburg City Schools forecast and ballot status", site: "propertytax.report", href: "https://propertytax.report/market/taxes/ohio/schools/budgets/district/twinsburg-city-summit" },
          ]}
        />
      </Section>
    </Page>
  );
}


