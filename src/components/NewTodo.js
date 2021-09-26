import React from "react"
import { Button, Input, InputGroup, InputGroupAddon } from 'reactstrap';

export default ({ handlerInputValue, create, todo }) => {
    return (
        <InputGroup style={{ "padding": "5px 5px"}}>
        <Input value={todo} 
         onChange={(event) => handlerInputValue(event.target.value)}
        placeholder="Describe your tasks here" />
        <InputGroupAddon addonType="append">
          <Button onClick={(event) => create(event)}>SAVE</Button>
        </InputGroupAddon>
      </InputGroup>
    )
}