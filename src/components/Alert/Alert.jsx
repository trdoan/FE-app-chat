import Swal from "sweetalert2";

export const swalError = () => {
  Swal.fire({
    title: "LỖI XÁC THỰC",
    text: "Vui lòng đăng nhập, để thực hiện chức năng",
    icon: "error",
    confirmButtonText: "Cool",
  });
};
