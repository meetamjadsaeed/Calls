import { useState, useEffect } from "react";
import axios from "axios";
import Link from 'next/link'
import { DownOutlined, SmileOutlined } from '@ant-design/icons';
import { Dropdown } from 'antd';
import { Popover } from 'antd';
import { Checkbox, Form } from 'antd';


import Header from "@/layout/header/Header";
import Footer from "@/layout/footer/Footer";
import Hero from "@/layout/main/Hero";


const { TextArea } = Input;

import styles from "@/assets/css/Home.module.css";



import Head from "next/head";

import { Card, Col, Row } from "antd";
import { Input } from "antd";
const { Search } = Input;
import { Button } from "antd";
import { Spin } from "antd";

const onFinish = (values) => {
  console.log('Success:', values);
};
const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo);
};

// const access_token = user && user.data && user.data.token;


// table 




import { Space, Table, Tag } from 'antd';

const Home = () => {
  const [user, setUser] = useState();
  const [totalCalls, apiCalls] = useState(0);
  const [apiStatus, setApiStatus] = useState();
  const [note, addNote] = useState({
    id: '',
    content: '',
  });
  const [details, setDetails] = useState({
    id: '1',
    callType: 'Voice Mail',
    duration: "Outbound",
    from: '0306123232',
    to: '0306123232',
    via: '0306123232',
  });

  const [data, setData] = useState([
    {
      key: '1',
      type: 'Login to View Data',
      direction: "Outbound",
      duration: '80 minutes 23 seconds',
      from: '0306123232',
      to: '0306123232',
      via: '0306123232',
      createdat: '12-08-18',
      status: 'archived',
      action: 'Login to View Data',

    },
  ]);

  const [filter, setFilter] = useState([
    {
      key: '1',
      label: "Amjad",

    },
  ]);
  // var $userToken = user && user.data && user.data.token;
  const fetchData = async () => {


    try {
      const response = await axios
        .get(`${process.env.NEXT_PUBLIC_BACKEND_API}calls`, {
          headers: {
            Authorization: `Bearer ${user && user.access_token && user.access_token}`
          }
        })
      const apiData = response.data.nodes;

      // Map the apiData to the format of the data array
      const newData = apiData.map((item) => ({
        key: item.id,
        type: item.call_type,
        direction: item.direction,
        duration: item.duration,
        from: item.from,
        to: item.to,
        via: item.via,
        createdat: item.created_at,
        status: item.is_archived === true ? 'Archived' : "Unarchive",
        action: "Add Note",
      }));
      console.log(user);
      // Set the values of the data array
      setData(newData);

    } catch (error) {
      console.log(error);
      setApiStatus(error);

    }
  };

  const viewDetails = async (id) => {

    try {
      await axios
        .get(`${process.env.NEXT_PUBLIC_BACKEND_API}calls/${id}`, {
          headers: {
            Authorization: `Bearer ${user && user.access_token && user.access_token}`
          }
        })
        .then((response) => {
          setDetails({
            key: response.data.id,
            callType: response.data.call_type,
            duration: response.data.duration,
            from: response.data.from,
            to: response.data.to,
            via: response.data.via,
          })
        })
      // .then((data) => {console.log(data)});





      // Set the values of the data array
      // setDetails(newData);
    } catch (error) {
      console.log(error);
    }

    // setDetails(id);
    console.log(id);
  }

  const postNote = async (id) => {

    try {
      e.preventDefault();
      axios
        .post(`${process.env.NEXT_PUBLIC_BACKEND_API}calls/${id}`, note)
        .then((res) => {
          const dataNew = JSON.stringify(res.data);
          localStorage.setItem("token", dataNew);
          console.log("Successfully logged in");
        })
        .catch((err) => console.error(err));

      // .then((data) => {console.log(data)});





      // Set the values of the data array
      // setDetails(newData);
    } catch (error) {
      console.log(error);
    }

    // setDetails(id);
    console.log(id);
  }


  const content = (
    <div>
      <h3>Add Noted: </h3>
      <p><b>Call details:</b>  {details && details.key}</p>
      <p><b>Call Type:</b> {details && details.callType}</p>
      <p><b>duration:</b> {details && details.duration}</p>
      <p><b>From:</b> {details && details.duration}</p>
      <p><b>To:</b> {details && details.to}</p>
      <p><b>Via:</b> {details && details.via}</p>

      <p>Add Note</p>
      <Form
        onSubmit={postNote}
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 600,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item>
          <TextArea rows={6}
            onChange={(e) =>
              addNote({ ...note, content: e.target.value })
            }
          />

        </Form.Item>






        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button
            style={{ color: "#ffffff", backgroundColor: "#4f46f8" }}
            htmlType="submit">
            Save
          </Button>
        </Form.Item>
      </Form>


    </div>
  );

  const fetchFilters = async () => {
    try {
      const response = await axios
        .get(`${process.env.NEXT_PUBLIC_BACKEND_API}calls`, {
          headers: {
            Authorization: `Bearer ${user && user.access_token && user.access_token}`
          }
        })
      const apiFilterData = response.data;

      // Map the apiData to the format of the data array
      const filterData = apiFilterData.map((item) => ({
        key: item.id,
        label: item.call_type,
      }));

      // Set the values of the data array
      // console.log(filterData);
      setFilter(filterData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // getData();
    fetchData();
    // fetchFilters();
    // const storedData = localStorage.getItem('data');
    // const data = storedData ? JSON.parse(storedData) : []; // use the stored data or an empty array if none is found
    // setData(data);

    const loggedInUser = localStorage.getItem("userToken");
    // console.log(localStorage.getItem("token"));

    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      // console.log(foundUser);
      setUser(foundUser);
    } else {
      console.log("User Not Found");
    }

    // setTimeout(() => {
    //   const loggedInUser = localStorage.getItem("userToken");
    //   if (loggedInUser) {
    //     // const foundUser = JSON.parse(loggedInUser);
    //     localStorage.removeItem('userToken');
    //   }
    // }, 90000);

  }, []);




  const handleStatusUpdate = (key) => {
    setData((prevData) => {
      const newData = prevData.map((item) => {
        if (item.key === key) {
          if (item.status === 'Archived' || item.status === 'ARCHIVED') {
            return {
              ...item,
              status: 'unarchived',
            };
          } else {
            return {
              ...item,
              status: 'Archived',
            };
          }
        }
        return item;
      });
      localStorage.setItem('addNote', JSON.stringify(newData)); // store the updated data in local storage
      return newData;

    });
  };


  const handleButtonUpdate = (key) => {
    setData((prevData) => {
      const newData = prevData.map((item) => {
        if (item.key === key) {
          if (item.action === 'Add Note' || item.action === 'add note') {
            return {
              ...item,
              action: 'Noted Added',
            };
          } else {
            return {
              ...item,
              action: 'Add Note',
            };
          }
        }
        return item;
      });
      localStorage.setItem('data', JSON.stringify(newData)); // store the updated data in local storage
      return newData;

    });
  };





  const columns = [
    {
      title: 'CALL TYPE',
      dataIndex: 'type',
      key: 'type',

      render: (_, { type }) => {
        let color = "";
        if (type === 'voicemail') {
          color = '#4f46f8';
        }
        else if (type === 'answered') {
          color = '#e71518';
        }
        else {
          color = '#00cc0';
        }

        return (
          <Link href={`call/1`}>
            <p style={{ color: `${color}` }} key={type}>
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </p>
          </Link>
        );
      },
      filters: [
        {
          text: 'DELECTUS',
          value: 'DELECTUS',
        },
        {
          text: 'Jim',
          value: 'Jim',
        },
      ],
      // specify the condition of filtering result
      // here is that finding the name started with `value`
      onFilter: (value, record) => record.type.indexOf(value) === 0,
      // sorter: (a, b) => a.name.length - b.name.length,
      // sortDirections: ['descend'],
    },

    {
      title: 'DIRECTION',
      dataIndex: 'direction',
      key: 'direction',
      render: (_, { direction }) => {
        let color = "#4f46f8";
        return (
          <p style={{ color: `${color}` }} key={direction}>
            {direction.charAt(0).toUpperCase() + direction.slice(1)}
          </p>

        );
      },
    },
    {
      title: 'DURATION',
      dataIndex: 'duration',
      key: 'duration',
      render: (_, { duration }) => {
        let color = "#4f46f8";
        const minutes = Math.floor(duration / 60);
        const seconds = duration - minutes * 60;

        return (
          <>
            <p key={duration}>
              {minutes + " minutes " + seconds + " seconds "}
            </p>
            <p style={{ color: `${color}` }} key={duration}>
              {"( " + duration + " seconds )"}
            </p>
          </>


        );
      },
    },
    {
      title: 'FROM',
      dataIndex: 'from',
      key: 'from',
    },
    {
      title: 'TO',
      dataIndex: 'to',
      key: 'to',
    },
    {
      title: 'VIA',
      dataIndex: 'via',
      key: 'via',
    },

    {
      title: 'CREATED AT',
      dataIndex: 'createdat',
      key: 'createdat',
    },

    {
      title: 'STATUS',
      dataIndex: 'status',
      key: 'status',
      render: (_, { status, key }) => {
        let color = status === "Archived" ? '#86b5b5' : '#e71518';
        // if (status === 'loser') {
        //   color = 'volcano';
        // }
        return (
          <Tag color={color} key={status} onClick={() => handleStatusUpdate(key)}>
            {status.toUpperCase()}
          </Tag>
        );
      },
    },

    {
      title: 'ACTION',
      dataIndex: 'action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">

          <Popover
            content={content}
            title="Title"
            trigger="click">
            <Button
              style={{ color: "#ffffff", backgroundColor: "#4f46f8" }}
              // onClick={() => handleButtonUpdate(record.key)}
              onClick={() => viewDetails(record.key)}
            >{record.action}</Button>
          </Popover>

          {/* <Button
            style={{ color: "#ffffff", backgroundColor: "#4f46f8" }}
            onClick={() => handletest(record.key)}
          >{record.action}</Button> */}

          {/* <Button
            style={{ color: "#ffffff", backgroundColor: "#4f46f8" }}
          // onClick={() => handleButtonUpdate(record.key)}
          >
            {record.key}
          </Button> */}

        </Space>
      ),
    },
  ];


  // for filter 

  const items = [
    {
      key: '1',
      label: "Amjad",
    },

    {
      key: '2',
      label: (
        <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
          1st menu item
        </a>
      ),
    },
    {
      key: '3',
      label: (
        <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
          1st menu item
        </a>
      ),
    },
  ];


  // table filter 
  const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };

  return (
    <>

      <Head>
        <title>Turing Test</title>
        <meta name="description" content="" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />



      <div className={styles.container}>
        <Hero />
        {/* <Dropdown
          menu={{
            filter,
          }}
        >
          <a onClick={(e) => e.preventDefault()}>
            <Space>
              Filter By
              <DownOutlined />
            </Space>
          </a>
        </Dropdown> */}

        <Table columns={columns} dataSource={data} onChange={onChange} />

        {/* {totalCalls && totalCalls <= 3 ?

          <Table columns={columns} dataSource={data} onChange={onChange} />
          :

          <Button
            style={{ color: "#ffffff", backgroundColor: "#4f46f8" }}

          >
            Please Login to View Data
          </Button>

        } */}
        {/* <p>{user && user.access_token && user.access_token}</p> */}

      </div>

      <Footer />

    </>
  )
}

export default Home