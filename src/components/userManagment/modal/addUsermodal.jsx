import React, { useState } from "react";
import { Modal, Button, ConfigProvider } from "antd";
import fa_IR from "antd/lib/locale/fa_IR";
import { useSelector, useDispatch } from "react-redux";
import {
  RsetUserManagmentEditModal,
  selectUserManagmentEditModal,
  RsetUserManagmentCurrentUser,
  selectUserManagmentCurrentUser,
  selectuserManagmentAddmodal,
  RsetuserManagmentAddmodal,
} from "../../../slices/userManagmentSlices";
import {
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  InputLabel,
  TextField,
} from "@mui/material";

const UserManagementEditModal = () => {
  const dispatch = useDispatch();
  const userManagmentAddmodal = useSelector(selectuserManagmentAddmodal);
  const userManagmentCurrentUser = useSelector(selectUserManagmentCurrentUser);
  const [lastName, setLastName] = useState(
    userManagmentCurrentUser?.lastName || ""
  );
  const [firstName, setFirstName] = useState(
    userManagmentCurrentUser?.firstName || ""
  );
  const [access, setAccess] = useState(userManagmentCurrentUser?.access || []);

  // Define all possible access options
  const allAccessOptions = [
    "ادمین سیستم",
    "مدیریت کارخانه ها",
    "مدیریت کوره ها",
    "مدیریت لیست بخش کوره ها",
    "مدیریت مدل های نسوز ها",
    "مدیریت ملزومات",
    "مدیریت رویدادهای کوره",
    "مدیریت ساخت کوره",
  ];

  const handleChangeLastName = (e) => {
    setLastName(e.target.value);
  };

  const handleChangeFirstName = (e) => {
    setFirstName(e.target.value);
  };

  const handleAccessChange = (accessItem) => {
    if (access.includes(accessItem)) {
      setAccess(access.filter((item) => item !== accessItem));
    } else {
      setAccess([...access, accessItem]);
    }
  };

  const handleModalCancel = () => {
    dispatch(RsetuserManagmentAddmodal(false));
  };

  const handleModalEdit = () => {
    dispatch(
      RsetUserManagmentCurrentUser({
        ...userManagmentCurrentUser,
        lastName: lastName,
        firstName: firstName,
        access: access,
      })
    );
    console.log(userManagmentCurrentUser);
  };

  const modalStyles = {
    header: {
      background: "gray",
      padding: "20px",
    },
    body: {
      borderRadius: 5,
      marginTop: "20px",
    },
    mask: {
      backdropFilter: "blur(10px)",
    },
    footer: {
      borderTop: "1px solid gray",
      marginTop: "20px",
      padding: "20px",
    },
    content: {
      boxShadow: "0 0 30px #999",
    },
  };

  return (
    <ConfigProvider direction="rtl" locale={fa_IR}>
      <Modal
        title={`ویرایش کاربر`}
        open={userManagmentAddmodal}
        styles={modalStyles}
        closable={false}
        onOk={handleModalCancel}
        onCancel={handleModalCancel}
        footer={(_, { OkBtn, CancelBtn }) => (
          <>
            <div className="bottom-modal d-flex justify-content-between align-items-center gap-3 w-100">
              <Button
                style={{ background: "red", color: "white" }}
                size="large"
                onClick={() => handleModalCancel()}
              >
                لغو
              </Button>
              <Button
                className="w-100"
                style={{ background: "blue", color: "white" }}
                size="large"
                onClick={() => handleModalEdit()}
              >
                اضافه کردن کاربر
              </Button>
            </div>
          </>
        )}
      >
        <form>
          <Box>
            <InputLabel className="fw-bold fs-5">نام</InputLabel>
            <TextField
              variant="outlined"
              fullWidth
              margin="normal"
              onChange={handleChangeFirstName}
            />
          </Box>
          <Box>
            <InputLabel className="fw-bold fs-5">نام خانوادگی</InputLabel>
            <TextField
              variant="outlined"
              fullWidth
              margin="normal"
              onChange={handleChangeLastName}
            />
          </Box>

          <FormGroup>
            {allAccessOptions.map((item, index) => (
              <FormControlLabel
                key={index}
                control={
                  <Checkbox
                    checked={access.includes(item)}
                    onChange={() => handleAccessChange(item)}
                  />
                }
                label={item}
              />
            ))}
          </FormGroup>
        </form>
      </Modal>
    </ConfigProvider>
  );
};

export default UserManagementEditModal;
