import React, { useState } from "react";
import { useEffect } from "react";
import { Button, Form } from "react-bootstrap";

const Setting = (props) => {
  const { settings, handleSaveSetting, handleFileChange } = props;

  const [setting, setSetting] = useState({});

  useEffect(() => {
    setSetting(settings);
  }, [settings]);

  const handleOnChnage = (e, evname) => {
    console.log(e.target.value);
    setSetting({ ...setting, [evname]: e.target.value });
  };

  return (
    <div className="row mt-4">
      <Form className="card mx-auto mb-5 py-3">
        <h1 className="text-center mb-5">Main Section Data</h1>
        <Form.Group className="mb-3" controlId="">
          <Form.Control
            type="text"
            value={Boolean(setting) ? setting.wallet_address : ""}
            onChange={(e) => handleOnChnage(e, "wallet_address")}
            placeholder="Wallet address"
          />
        </Form.Group>
        <hr />
        <div className="mb-3 d-flex align-items-center">
          <div className="icon-box">
            <span>
              <img
                src={
                  Boolean(setting)
                    ? setting.token_logo
                    : require("../../../images/METAVPAD.jpg").default
                }
                width="100px"
                alt="MetaVPad"
              />
            </span>
          </div>
          <input
            className="mx-3"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>
        <Form.Group className="mb-3" controlId="">
          <Form.Label>Token Name</Form.Label>
          <Form.Control
            type="text"
            value={Boolean(setting) ? setting.token_name : ""}
            onChange={(e) => handleOnChnage(e, "token_name")}
            placeholder="USDT"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="">
          <Form.Label>Token Description</Form.Label>
          <Form.Control
            type="text"
            value={Boolean(setting) ? setting.token_description : ""}
            onChange={(e) => handleOnChnage(e, "token_description")}
            placeholder="METAVPAD - Building the Metaverse, One Block at a time"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="">
          <Form.Label>App link</Form.Label>
          <Form.Control
            type="text"
            value={Boolean(setting) ? setting.app_link : ""}
            onChange={(e) => handleOnChnage(e, "app_link")}
            placeholder="https://metavpad.com"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="">
          <Form.Label>Twitter</Form.Label>
          <Form.Control
            type="text"
            value={Boolean(setting) ? setting.twitter_link : ""}
            onChange={(e) => handleOnChnage(e, "twitter_link")}
            placeholder="https://www.twitter.com/"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="">
          <Form.Label>Medium</Form.Label>
          <Form.Control
            type="text"
            value={Boolean(setting) ? setting.medium_link : ""}
            onChange={(e) => handleOnChnage(e, "medium_link")}
            placeholder="https://medium.com/@metavpad"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="">
          <Form.Label>Telegram</Form.Label>
          <Form.Control
            type="text"
            value={Boolean(setting) ? setting.telegram_link : ""}
            onChange={(e) => handleOnChnage(e, "telegram_link")}
            placeholder="https://t.me/metavpadann"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="">
          <Form.Label>First Note</Form.Label>
          <Form.Control
            type="text"
            value={Boolean(setting) ? setting.first_note : ""}
            onChange={(e) => handleOnChnage(e, "first_note")}
            placeholder="If you use ...."
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="">
          <Form.Label>Second Note</Form.Label>
          <Form.Control
            type="text"
            value={Boolean(setting) ? setting.second_note : ""}
            onChange={(e) => handleOnChnage(e, "second_note")}
            placeholder="Claim button ..."
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="">
          <Form.Label>Progress Title</Form.Label>
          <Form.Control
            type="text"
            value={Boolean(setting) ? setting.progress_title : ""}
            onChange={(e) => handleOnChnage(e, "progress_title")}
            placeholder="First come first...."
          />
        </Form.Group>
        <div className="w-100 d-flex justify-content-end">
          <Button variant="primary" onClick={() => handleSaveSetting(setting)}>
            Save
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default Setting;
