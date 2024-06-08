function Test() {
  return (
    <div style={{ backgroundColor: "red" }}>
      <div
        style={{
          height: "30px",
          color: "white",
          position: "sticky",
          top: "0px",
          marginTop: "-30px",
        }}
      >
        TOP
      </div>
      <div style={{ height: "200vh", backgroundColor: "green" }}></div>
      <div
        style={{
          height: "30px",
          color: "white",
          position: "sticky",
          bottom: "0px",
          marginTop: "-30px",
        }}
      >
        HAI MARK
      </div>
    </div>
  );
}

export default Test;
