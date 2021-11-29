import React, { useState } from 'react';
import Layout from '../../../components/Layout';
import { Button, Input, Form, Message } from 'semantic-ui-react';
import Campaign from '../../../ethereum/campaign';
import web3 from '../../../ethereum/web3';
import { Router, Link } from '../../../routes';

const CreateRequest = (props) => {

    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [recipient, setRecipient] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const onSubmit = async (event) => {
        event.preventDefault();
        setMessage('');
        setLoading(true);

        const campaign = Campaign(props.address);

        try {
            const accounts = await web3.eth.getAccounts();

            await campaign.methods
                .createRequest(description, web3.utils.toWei(amount, 'ether'), recipient)
                .send({ from: accounts[0] });

            Router.pushRoute(`/campaigns/${props.address}/requests`);
        } catch (error) {
            setMessage(error.message);
        }
        setDescription('');
        setRecipient('');
        setAmount('');
        setLoading(false);
    }

    return (
        <Layout>
            <Link route={`/campaigns/${props.address}/requests`}>
                <a>Back</a>
            </Link>
            <h3>Create Request</h3>
            <Form onSubmit={onSubmit} error={!!message}>
                <Form.Field>
                    <label>Description</label>
                    <Input value={description} onChange={Event => setDescription(Event.target.value)} />
                </Form.Field>
                <Form.Field>
                    <label>Amount (Ether)</label>
                    <Input value={amount} onChange={Event => setAmount(Event.target.value)} />
                </Form.Field>
                <Form.Field>
                    <label>Recipient</label>
                    <Input value={recipient} onChange={Event => setRecipient(Event.target.value)} />
                </Form.Field>
                <Message error header='Oop, something went wrong!' content={message} />
                <Button primary loading={loading} disabled={loading}>Create</Button>
            </Form>
        </Layout>
    );
};

CreateRequest.getInitialProps = async (props) => {
    const { address } = props.query;

    return { address };
};

export default CreateRequest;