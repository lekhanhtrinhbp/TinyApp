import React from "react";
import { Table } from "semantic-ui-react";
import { Link } from "react-router";
import TranslateTag from "components/TranslateTag";
import translate from "components/Translate";

const UserInfoRegisteredEvents = props => {
  return (
    <div>
      {props.eventRegistered ? (
        <Table striped>
          <Table.Body>
            {props.eventRegistered.map(event => (
              <Table.Row verticalAlign="top">
                <Table.Cell>{event.value}</Table.Cell>
                <Table.Cell>
                  <Link to={`/event/${event.key}`}>
                    <i className="fa fa-eye" />
                    <TranslateTag lblKey="view" />
                  </Link>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      ) : (
        translate("no-result")
      )}
    </div>
  );
};

export default UserInfoRegisteredEvents;
