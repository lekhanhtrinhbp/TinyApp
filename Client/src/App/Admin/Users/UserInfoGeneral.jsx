import React from "react";
import T from "prop-types";
import Moment from "moment";
import { Table } from "semantic-ui-react";
import TranslateTag from "components/TranslateTag";

const UserInfoGeneral = props => {
  return (
    <Table striped>
      <Table.Body>
        <Table.Row verticalAlign="top">
          <Table.Cell>
            <TranslateTag lblKey="user-name" />
          </Table.Cell>
          <Table.Cell>{props.username ? props.username : "--/--"}</Table.Cell>
        </Table.Row>
        <Table.Row verticalAlign="top">
          <Table.Cell>
            <TranslateTag lblKey="created-date" />
          </Table.Cell>
          <Table.Cell>
            {props.createdDate
              ? Moment(props.createdDate).format("DD-MM-YYYY")
              : "--/--"}
          </Table.Cell>
        </Table.Row>
        <Table.Row verticalAlign="top">
          <Table.Cell>
            <TranslateTag lblKey="email" />
          </Table.Cell>
          <Table.Cell>{props.email ? props.email : "--/--"}</Table.Cell>
        </Table.Row>
        <Table.Row verticalAlign="top">
          <Table.Cell>
            <TranslateTag lblKey="first-name" />
          </Table.Cell>
          <Table.Cell>
            {props.guest && props.guest.firstName
              ? props.guest.firstName
              : "--/--"}
          </Table.Cell>
        </Table.Row>
        <Table.Row verticalAlign="top">
          <Table.Cell>
            <TranslateTag lblKey="last-name" />
          </Table.Cell>
          <Table.Cell>
            {props.guest && props.guest.lastName
              ? props.guest.lastName
              : "--/--"}
          </Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  );
};

export default UserInfoGeneral;
