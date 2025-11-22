export default function DashboardLayout({ sidebar, content }) {
  return (
    <div className="row g-3">
      <div className="col-md-4">{sidebar}</div>
      <div className="col-md-8">
        <div className="p-4 rounded shadow-sm bg-white">{content}</div>
      </div>
    </div>
  );
}
