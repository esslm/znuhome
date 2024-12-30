import "./Container.css";

const Container = (props) => {
  return (
    <div
      className="container"
      style={{ backgroundAttachment: props.bg, position: "relative" }}
    >
      {props.children}
    </div>
  );
};

export default Container;
