import React, { Fragment, useEffect, useState } from "react";
import { Input, Space, Table, ConfigProvider, Empty } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { Container, Row, Col, Button, Tabs, Tab } from "react-bootstrap";
import faIR from "antd/lib/locale/fa_IR";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ListIcon from "@mui/icons-material/List";
import UserManagementEditModal from "./modal/UserManagementEditModal";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import AddModal from "./modal/addUsermodal";

//slices
import { selectLoading, RsetLoading } from "../../slices/mainSlices";
import {
  selectUserManagmentEditModal,
  RsetUserManagmentEditModal,
  RsetUserManagmentCurrentUser,
  selectUserManagmentCurrentUser,
  selectuserManagmentAddmodal,
  RsetuserManagmentAddmodal,
} from "../../slices/userManagmentSlices";

const data = [
  {
    firstName: "shayan",
    lastName: "golestani",
    userName: "wolfi",
    access: [
      "ادمین سیستم",
      "مدیریت کارخانه ها",
      "مدیریت کوره ها",
      "مدیریت لیست بخش کوره ها",
      "مدیریت مدل های نسوز ها",
      "مدیریت ملزومات",
      "مدیریت رویدادهای کوره",
      "مدیریت ساخت کوره",
    ],
  },
  {
    firstName: "soheil",
    lastName: "abadi",
    userName: "soli",
    access: [
      // "ادمین سیستم",
      "مدیریت کارخانه ها",
      "مدیریت کوره ها",
      "مدیریت لیست بخش کوره ها",
      "مدیریت مدل های نسوز ها",
      // "مدیریت ملزومات",
      // "مدیریت رویدادهای کوره",
      "مدیریت ساخت کوره",
    ],
  },
  {
    firstName: "ali",
    lastName: "hoseini",
    userName: "ali2020",
    access: [
      // "ادمین سیستم",
      // "مدیریت کارخانه ها",
      // "مدیریت کوره ها",
      "مدیریت لیست بخش کوره ها",
      "مدیریت مدل های نسوز ها",
      // "مدیریت ملزومات",
      // "مدیریت رویدادهای کوره",
      "مدیریت ساخت کوره",
    ],
  },
];

const UsersList = () => {
  const dispatch = useDispatch();
  //table state
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  //select
  const loading = useSelector(selectLoading);
  const userManagmentEditModal = useSelector(selectUserManagmentEditModal);
  const userManagmentCurrentUser = useSelector(selectUserManagmentCurrentUser);
  const userManagmentAddmodal = useSelector(selectuserManagmentAddmodal);
  const handleAddUserModalOpen = () => {
    dispatch(RsetuserManagmentAddmodal(true));
  };
  console.log(userManagmentAddmodal);

  //table search
  const getColumnSearchProps = (dataIndex, placeholder) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          placeholder={placeholder}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => confirm()}
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space className="d-flex justify-content-between">
          <Button
            variant="primary"
            className="font10"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="sm"
            style={{ width: 90 }}
          >
            جستجو
          </Button>
          <Button
            variant="success "
            className="font10"
            size="sm"
            onClick={() => {
              clearFilters();
              setSearchText("");
              handleSearch(selectedKeys, confirm, "");
              close();
            }}
            style={{ width: 80 }}
          >
            حذف فیلتر
          </Button>
          <Button
            className="font10"
            variant="secondary"
            size="sm"
            onClick={() => {
              close();
            }}
          >
            بستن
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1677ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) => {
      const columnValue = record[dataIndex] ? record[dataIndex].toString() : "";
      return columnValue.toLowerCase().includes(value.toLowerCase());
    },
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => {
          const input = document.querySelector(
            ".ant-table-filter-dropdown input"
          );
          if (input) {
            input.focus();
          }
        }, 0);
      }
    },
    //this rendering is depending on data is array or not
    render: (text, record) => {
      const columnData = record[dataIndex];
      return Array.isArray(columnData) ? columnData.join(", ") : text;
    },
  });

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  //table column
  const columns = [
    {
      key: "firstName",
      title: "نام",
      dataIndex: "firstName",
      sorter: (a, b) => {
        if (!a.firstName && !b.firstName) {
          return 0;
        }

        if (!a.firstName) {
          return 1;
        }

        if (!b.firstName) {
          return -1;
        }

        return a.firstName.localeCompare(b.firstName);
      },
      ...getColumnSearchProps("firstName", "جستجو..."),
      width: 50,
    },
    {
      key: "lastName",
      title: "نام خانوادگی",
      dataIndex: "lastName",
      sorter: (a, b) => {
        if (!a.lastName && !b.lastName) {
          return 0;
        }

        if (!a.lastName) {
          return 1;
        }

        if (!b.lastName) {
          return -1;
        }

        return a.lastName.localeCompare(b.lastName);
      },
      ...getColumnSearchProps("lastName", "جستجو..."),
      width: 50,
    },
    {
      key: "access",
      title: "دسترسی",
      dataIndex: "access",
      render: (access) => <span>{access.join(", ")}</span>,
      sorter: (a, b) => a.access.join().localeCompare(b.access.join()),
      ...getColumnSearchProps("access", "جستجو..."),
      width: 200,
    },
    // {
    //   key: "devices",
    //   title: "تعداد وسیله نقلیه",
    //   dataIndex: "devices",
    //   sorter: (a, b) => {
    //     if (!a.driverName && !b.driverName) {
    //       return 0;
    //     }

    //     if (!a.driverName) {
    //       return 1;
    //     }

    //     if (!b.driverName) {
    //       return -1;
    //     }

    //     return a.devices?.length.localeCompare(b.devices?.length);
    //   },
    //   render: (devices) => devices?.length,
    //   ...getColumnSearchProps("devices", "جستجو..."),
    //   width: 200,
    // },
    {
      key: "operation",
      title: "عملیات",
      dataIndex: "operation",
      render: (_, record) => <span>{operation(record)}</span>,
      width: 100,
    },
  ];

  //table custom pagination
  const paginationConfig = {
    position: ["bottomCenter"],
    showTotal: (total) => (
      <span className="font12">مجموع وسیله ها: {total}</span>
    ),
    pageSize: 10,
    showSizeChanger: false,
    pageSizeOptions: [],
    size: "small",
  };
  //table functions

  const operation = (request) => {
    return (
      <div className="d-flex justify-content-center gap-1 ms-2 flex-wrap">
        <Button
          title="ویرایش"
          className="btn btn-primary d-flex align-items-center  mb-2 mb-md-2"
          size="sm"
          active
          onClick={() => {
            dispatch(RsetUserManagmentEditModal(true));
            dispatch(RsetUserManagmentCurrentUser(request));
          }}
        >
          <EditIcon />
        </Button>
        <Button
          title="حذف"
          className="btn btn-danger d-flex align-items-center  mb-2 mb-md-2"
          size="sm"
          active
          onClick={() => {}}
        >
          <DeleteForeverIcon />
        </Button>
      </div>
    );
  };

  return (
    <Container fluid className="py-4">
      <Fragment>
        <section className="position-relative">
          <div
            className="d-flex justify-content-between text-white py-3  borderRadius-top"
            style={{ background: "#485550" }}
          >
            <div className="ms-4 mt-1">
              <span className="me-2">
                <ListIcon />
              </span>
              مدیریت کاریران{" "}
            </div>
            <Button
              title="افزودن کاربر جدید"
              size="sm"
              variant="success"
              className=" me-4 shadow rounded-circle py-2"
              onClick={handleAddUserModalOpen}
            >
              <AddCircleIcon />
            </Button>
          </div>

          <div>
            <div className="d-flex align-items-center justify-content-between"></div>
            <div dir="rtl" className="position-relative">
              {!loading ? (
                <Fragment>
                  <ConfigProvider
                    locale={faIR}
                    // theme={{
                    //   token: {
                    //     // Seed Token
                    //     // colorPrimary: "#00b96b",
                    //     // Alias Token
                    //     colorBgContainer: `${!darkMode ? "#303030" : "#fff"}`,
                    //     colorText: "white",
                    //     colorTextPlaceholder: `${
                    //       !darkMode ? "white" : "black"
                    //     }`,
                    //     // borderColor: "#000",
                    //   },
                    //   components: {
                    //     Table: {
                    //       colorBgContainer: ` ${
                    //         !darkMode ? "#222a38" : "#e3e3e3"
                    //       }`,
                    //       borderColor: "#000",
                    //       rowHoverBg: `${!darkMode ? "black" : "#ccc"}`,
                    //       colorText: `${!darkMode ? "white" : "black"}`,
                    //       headerBg: `${!darkMode ? "#1c283d" : "gray"}`,
                    //       headerSortHoverBg: `${
                    //         !darkMode ? "#000" : "#888a89"
                    //       }`,
                    //       headerSortActiveBg: `${
                    //         !darkMode ? "#000" : "#888a89"
                    //       }`,
                    //       // headerFilterHoverIcon: "#fff",
                    //       // headerFilterIcon: "#fff",
                    //     },
                    //   },
                    // }}
                  >
                    <Table
                      locale={{
                        emptyText: <Empty description="اطلاعات موجود نیست!" />,
                      }}
                      className="list"
                      bordered
                      dataSource={data}
                      columns={columns}
                      pagination={paginationConfig}
                      scroll={{ x: "max-content" }}
                      size="middle"
                    />
                  </ConfigProvider>
                </Fragment>
              ) : (
                <div
                  className="d-flex justify-content-center"
                  style={{ marginTop: "200px" }}
                >
                  {/* <Loading height={"60px"} width={"60px"} /> */}
                </div>
              )}
            </div>
          </div>
        </section>
        {userManagmentEditModal && <UserManagementEditModal />}
        {userManagmentAddmodal && <AddModal />}
      </Fragment>
    </Container>
  );
};

export default UsersList;
