import PropTypes from "prop-types";

FormWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

function FormWrapper({ children }) {
  return (
    <div className="w-screen h-screen flex justify-center items-center overflow-hidden bg-[url('https://www.newyorkgourmetcoffee.com/mm5/graphics/00000001/1/coffee-beans-5928034_1280.jpg')] bg-cover">
      <div className="backdrop-blur-md p-16 rounded-lg overflow-hidden">
        {children}
      </div>
    </div>
  );
}

export default FormWrapper;
