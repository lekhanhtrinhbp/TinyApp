import React from "react";
import { Table } from "semantic-ui-react";
import TranslateTag from "components/TranslateTag";
import { Link } from "react-router";
import translate from "components/Translate";

const UserInfoEvents = props => {
  return (
    <div>
      {props.eventCreated ? (
        <Table striped>
          <Table.Body>
            {props.eventCreated.map(event => (
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

export default UserInfoEvents;
