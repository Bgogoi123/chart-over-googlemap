function Select({
  data,
  setSelectedDisease,
}: {
  data: string[];
  setSelectedDisease: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <div style={{ padding: "0.5em 0 0.5em 0" }}>
      <select
        placeholder="Select "
        style={{
          padding: "0.4em 1em 0.4em 1em",
          color: "blueviolet",
        }}
        onChange={(event) => setSelectedDisease(event.target.value)}
      >
        <option value="" selected disabled>
          Select a disease
        </option>
        {data.map((datum, index) => {
          return (
            <option
              key={index}
              value={datum}
              style={{
                color: "darkblue",
              }}
            >
              {datum}
            </option>
          );
        })}
      </select>
    </div>
  );
}

export default Select;
