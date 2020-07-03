export const constraintsEmail = {
    email: {
      presence: {
        allowEmpty: false,
        message: "^Por favor entre com um email!"
      },
      email: {
        message: "^Por favor entre com um email válido!"
      }
    },
  };
  
export default constraintsEmail;