import { Link } from "react-router-dom";
import {
  Calendar,
  TrendingUp,
  Newspaper,
  Briefcase,
  Code,
  ExternalLink,
  ArrowRight,
} from "lucide-react";

const upcomingEvents = [
  { date: "Aug 15", title: "Independence Day Celebration", tag: "Cultural" },
  { date: "Aug 20", title: "Tech Symposium 2026", tag: "Technical" },
  { date: "Sep 5", title: "Teachers' Day Event", tag: "Cultural" },
  { date: "Sep 12", title: "Hackathon: CodeFest", tag: "Coding" },
];

const trendingTopics = [
  "#Placements2026",
  "#InternshipDrive",
  "#CodingContest",
  "#CampusHackathon",
  "#TechTalk",
  "#AlumniMeet",
];

const campusNews = [
  { title: "New AI Lab Inaugurated", time: "2 days ago" },
  { title: "Placement Drive: 50+ offers", time: "5 days ago" },
  { title: "Inter-College Sports Meet", time: "1 week ago" },
];

const placementUpdates = [
  { company: "Google", role: "SDE Intern", count: 3 },
  { company: "Microsoft", role: "SWE", count: 5 },
  { company: "Amazon", role: "SDE-1", count: 8 },
  { company: "Infosys", role: "SE", count: 12 },
];

const codingContests = [
  { name: "CodeChef Starters", platform: "CodeChef", in: "2 days" },
  { name: "LeetCode Weekly 420", platform: "LeetCode", in: "4 days" },
  { name: "CF Round 1050", platform: "Codeforces", in: "6 days" },
];

function RightSidebar() {
  return (
    <aside className="rsb">
      <div className="rsb-inner">
        {/* Upcoming Events */}
        <div className="rsb-card">
          <div className="rsb-card-header">
            <Calendar size={18} className="rsb-card-icon" />
            <h3 className="rsb-card-title">Upcoming Events</h3>
          </div>
          <div className="rsb-card-body">
            {upcomingEvents.map((event, i) => (
              <div key={i} className="rsb-event-item">
                <div className="rsb-event-date">
                  <span className="rsb-event-date-text">{event.date}</span>
                </div>
                <div className="rsb-event-info">
                  <span className="rsb-event-title">{event.title}</span>
                  <span className={`rsb-event-tag rsb-tag-${event.tag.toLowerCase()}`}>
                    {event.tag}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <Link to="/filter" className="rsb-card-footer-link">
            View all events <ArrowRight size={14} />
          </Link>
        </div>

        {/* Trending Topics */}
        <div className="rsb-card">
          <div className="rsb-card-header">
            <TrendingUp size={18} className="rsb-card-icon" />
            <h3 className="rsb-card-title">Trending Topics</h3>
          </div>
          <div className="rsb-card-body">
            <div className="rsb-trending-grid">
              {trendingTopics.map((tag, i) => (
                <Link key={i} to={`/filter?search=${encodeURIComponent(tag)}`} className="rsb-trending-tag">
                  {tag}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Campus News */}
        <div className="rsb-card">
          <div className="rsb-card-header">
            <Newspaper size={18} className="rsb-card-icon" />
            <h3 className="rsb-card-title">Campus News</h3>
          </div>
          <div className="rsb-card-body">
            {campusNews.map((news, i) => (
              <div key={i} className="rsb-news-item">
                <div className="rsb-news-dot" />
                <div className="rsb-news-info">
                  <span className="rsb-news-title">{news.title}</span>
                  <span className="rsb-news-time">{news.time}</span>
                </div>
              </div>
            ))}
          </div>
          <Link to="/display" className="rsb-card-footer-link">
            More news <ExternalLink size={14} />
          </Link>
        </div>

        {/* Placement Updates */}
        <div className="rsb-card">
          <div className="rsb-card-header">
            <Briefcase size={18} className="rsb-card-icon" />
            <h3 className="rsb-card-title">Placement Updates</h3>
          </div>
          <div className="rsb-card-body">
            {placementUpdates.map((p, i) => (
              <div key={i} className="rsb-placement-item">
                <div className="rsb-placement-left">
                  <span className="rsb-placement-company">{p.company}</span>
                  <span className="rsb-placement-role">{p.role}</span>
                </div>
                <span className="rsb-placement-count">{p.count}</span>
              </div>
            ))}
          </div>
          <Link to="/placementnews" className="rsb-card-footer-link">
            All placements <ArrowRight size={14} />
          </Link>
        </div>

        {/* Coding Contests */}
        <div className="rsb-card">
          <div className="rsb-card-header">
            <Code size={18} className="rsb-card-icon" />
            <h3 className="rsb-card-title">Coding Contests</h3>
          </div>
          <div className="rsb-card-body">
            {codingContests.map((contest, i) => (
              <div key={i} className="rsb-contest-item">
                <div className="rsb-contest-info">
                  <span className="rsb-contest-name">{contest.name}</span>
                  <span className="rsb-contest-platform">{contest.platform}</span>
                </div>
                <span className="rsb-contest-in">in {contest.in}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}

export default RightSidebar;