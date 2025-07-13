
import React, { useState, useEffect } from 'react';
import { Card, Statistic, Row, Col, Button, Table, Modal, Form, Input, Switch, message, Popconfirm, Tooltip } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { supabase } from '../supabaseClient';
import { UserAuth } from '../context/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';



const Dashboard = () => {
    const [dataSource, setDataSource] = useState([]);
    const { session, signOut } = UserAuth();
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [updatingUser, setUpdatingUser] = useState(null);



    const fetchUsers = async () => {
        const { data, error } = await supabase.from('users').select('*');
        if (error) {
            setError(error.message);
        } else if (data) {
            // Ensure each row has a unique key for Ant Design Table
            const withKeys = data.map((row) => ({ ...row, key: row.id || row.email || row.name }));
            setDataSource(withKeys);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        form.resetFields();
        setUpdatingUser(null);
    };

    const handleAddUser = async (values) => {
        setLoading(true);
        const { name, email, status } = values;
        const { error } = await supabase.from('users').insert([{ name, email, status }]);
        setLoading(false);
        if (error) {
            message.error('Failed to add user: ' + error.message);
        } else {
            message.success('User added successfully!');
            handleCancel();
            fetchUsers();
        }
    };

    const handleDelete = async (id) => {
        const { error } = await supabase.from('users').delete().eq('id', id);
        if (error) {
            message.error('Failed to delete user: ' + error.message);
        } else {
            message.success('User deleted successfully!');
            fetchUsers();
        }
    };

    const columns = [
        {
            title: "Profile",
            dataIndex: 'picture',
            key: 'picture',
            render: (picture) => {

                return (
                    <img
                        src={

                            session?.user?.user_metadata?.avatar_url ||
                            session?.user?.user_metadata?.picture ||
                            'https://via.placeholder.com/40'
                        }
                        alt="Profile"
                        className="rounded-full w-10 h-10"
                    />
                );
            },
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: "Role",
            dataIndex: 'role',
            key: 'role',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status) => {
                // Handle boolean, string, or number status
                const isActive = status === true || status === 'Active' || status === 'TRUE' || status === 1;
                return (
                    <span className={isActive ? 'text-green-600' : 'text-red-600'}>
                        {isActive ? 'Active' : 'Inactive'}
                    </span>
                );
            },
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_, record) => (
                <div className="flex gap-2">
                    <Tooltip title="Update">
                        <Button
                            icon={<EditOutlined />}
                            size="small"
                            type="default"
                            onClick={() => {
                                setUpdatingUser(record);
                                form.setFieldsValue(record);
                                showModal();
                            }}
                        />
                    </Tooltip>
                    <Popconfirm
                        title="Are you sure to delete this user?"
                        onConfirm={() => handleDelete(record.id)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Tooltip title="Delete">
                            <Button
                                icon={<DeleteOutlined />}
                                size="small"
                                danger
                            />
                        </Tooltip>
                    </Popconfirm>
                </div>
            ),
        },
    ];

    useEffect(() => {
        if (!session) {
            navigate('/sign-up');
        }
    }, [session, navigate]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-200 p-8">
            <h1 className='text-3xl font-bold mb-3'>Welcome, {session?.user?.email}</h1>
            <Row gutter={24} className="mb-8">
                <Col xs={24} md={8}>
                    <Card className="shadow-lg">
                        <Statistic title="Users" value={dataSource.length} valueStyle={{ color: '#3b82f6' }} />
                    </Card>
                </Col>
                <Col xs={24} md={8}>
                    <Card className="shadow-lg">
                        <Statistic
                            title="Active Sessions"
                            value={dataSource.filter(user =>
                                user.status === true ||
                                user.status === 'Active' ||
                                user.status === 'TRUE' ||
                                user.status === 1
                            ).length}
                            valueStyle={{ color: '#10b981' }}
                        />
                    </Card>
                </Col>
                <Col xs={24} md={8}>
                    <Card className="shadow-lg">
                        <Statistic title="Revenue" prefix="$" value={12400} valueStyle={{ color: '#f59e42' }} />
                    </Card>
                </Col>
            </Row>
            <Card className="shadow-lg">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-semibold">User List</h2>
                    <Button type="primary" onClick={showModal}>Add User</Button>
                </div>
                {error && <div className="text-red-600 mb-4">{error}</div>}
                <Table dataSource={dataSource} columns={columns} pagination={false} />
            </Card>

            <Button type="primary" onClick={signOut} className="mt-4">Sign Out</Button>

            <Modal
                title={updatingUser ? "Update User" : "Add User"}
                open={isModalOpen}
                onCancel={handleCancel}
                footer={null}
            >
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleAddUser}
                >
                    <Form.Item
                        label="Name"
                        name="name"
                        rules={[{ required: true, message: 'Please input the name!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[{ required: true, message: 'Please input the email!' }, { type: 'email', message: 'Invalid email!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Status"
                        name="status"
                        valuePropName="checked"
                        initialValue={true}
                    >
                        <Switch checkedChildren="Active" unCheckedChildren="Inactive" />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" loading={loading} block>
                            {updatingUser ? "Update User" : "Add User"}
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default Dashboard;