import React from "react" 
import { Button, ListGroup, ListGroupItem } from "reactstrap"

export default ({ todos, doneOrRemove }) => {
    return (
        <ListGroup style={{ "padding": "5px" }}>
        {
          todos.map((todo, index) => {
            return (
              <ListGroupItem tag="a" href="#" action>
                {todo}
                <Button  onClick={() => doneOrRemove(index)} style={{ "float": "right" }}>Delete or Done</Button>
              </ListGroupItem>
            )
          })
        }
      </ListGroup>
    )
}