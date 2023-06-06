export class GlobalConstants {
  static domain = "http://localhost:5000/";
  // static domain = "https://healthyfy-api.onrender.com/";
}
export const EMAIL_REGEX = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

export const PASSWORD_REGEX =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

export const customStyles = {
  rows: {
    style: {
      // minHeight: "60px", // override the row height
      fontSize: "14px",
    },
  },
  cells: {
    style: {
      border: "0.5px solid #EFEFEF",
    },
  },
  headCells: {
    style: {
      fontSize: "16px",
      fontWeight: "600",
      textTransform: "uppercase",
      border: "1px solid #EFEFEF",
      backgroundColor: "#415F77",
      color: "#fff",
      // padding:"12px",
    },
  },
  title: {
    style: {
      overflow: "none",
    },
  },
};
