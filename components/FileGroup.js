export default function FileGroup({ title, fieldA, fieldB, files, setFiles }) {
  return (
    <div className="card">
      <h3 style={{ marginTop: 0 }}>{title}</h3>
      <div className="grid">
        <div className="filebox">
          <label className="label">Recto</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFiles({ ...files, [fieldA]: e.target.files?.[0] || null })}
          />
        </div>
        <div className="filebox">
          <label className="label">Verso</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFiles({ ...files, [fieldB]: e.target.files?.[0] || null })}
          />
        </div>
      </div>
    </div>
  );
}
