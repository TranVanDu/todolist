import React, { Component } from 'react';
import './App.css';
import classNames from 'classnames';

import checkMark from './img/check-mark.svg';
import TodoItem from './components/TodoItem';
import Footer from './components/Footer';

class App extends Component {
  constructor() {
    super();
    this.state = {
      editItem: false,
      newItem: "",
      button: 0,
      isCheckButton: "All",
      todoItems: [
        { title: "Go to school", isComplete: true },
        { title: "learn english", isComplete: false },
        { title: "xxxxx", isComplete: false }
      ]
    };

    this.onKeyUp = this.onKeyUp.bind(this);
    this.onChange = this.onChange.bind(this);
    this.checkAllLists = this.checkAllLists.bind(this);
    this.checkActiveLists = this.checkActiveLists.bind(this);
    this.checkCompleteLists = this.checkCompleteLists.bind(this);
    this.clearItems = this.clearItems.bind(this);
    this.allItemClick = this.allItemClick.bind(this);
  }


  onItemClick(item) {
    return (event) => {
      const isComplete = item.isComplete;
      const { todoItems } = this.state;
      const index = todoItems.indexOf(item);
      this.setState({
        todoItems: [
          ...todoItems.slice(0, index),
          {
            ...item,
            isComplete: !isComplete
          },
          ...todoItems.slice(index + 1)
        ]
      });
    };
  }

  checkCountComplete() {
    const { todoItems } = this.state;
    let x = 0;
    for (let i in todoItems) {
      if (todoItems[i].isComplete) {
        x++;
      }
    }
    if (x) {
      return true;
    } else return false;
  }

  onKeyUp(event) {

    if (event.keyCode === 13) {
      let text = event.target.value;
      let textValue = text.trim();
      if (!textValue) {
        return (alert("Hãy nhập vào chuỗi!!!"));
      }
      if(!this.state.editItem ){
        this.setState({
          newItem: "",
          todoItems: [
            { title: textValue, isComplete: false },
            ...this.state.todoItems
          ]
        });
      }
      else{
        const{index} = this.state;
        const{todoItems} = this.state;
        this.setState({
          newItem:"",
          todoItems: [
            ...todoItems.slice(0, index),
            {title: textValue, isComplete: todoItems[index].isComplete},
            ...todoItems.slice(index +1)
          ],editItem: false
        });
      }
    }
  }

  onChange(event) {
    this.setState({
      newItem: event.target.value
    });
  }

  editItem(item){
    return (event) => {
      const {todoItems} = this.state;
      const index = todoItems.indexOf(item);
      console.log(index);
      this.setState({
        index: index,
        editItem: true,
        newItem: item.title
      });
    }
  }

  deleteItem(item){
    return (event) =>{
      const {todoItems} = this.state;
      const index = todoItems.indexOf(item);

      this.setState({
        todoItems: [
          ...todoItems.slice(0, index),
          ...todoItems.slice(index+1)
        ]
      });
    }
  }

  allItemClick() {
    const{todoItems} = this.state;
    var checkTodo ;
    if(this.check()){
      checkTodo = todoItems.map((items)=>{
        if(items.isComplete){
          items.isComplete = false;
        }
        return items;
      });
    }
    else{
      checkTodo = todoItems.map((items)=>{
        if(!items.isComplete){
          items.isComplete = true;
        }
        return items;
      });
    }
    this.setState({
      todoItems: checkTodo
    });
  }


  checkActiveLists() {
    const todoItem = this.state.todoItems;
    const todoItemsFilter = todoItem.filter((items) => items.isComplete !== true);
    this.setState({
      button: 1,
      isCheckButton: "Active",
      active: todoItemsFilter,
    })
  }
  checkAllLists() {
    this.setState({
      button: 0,
      isCheckButton: "All",
      todoItems: [
        ...this.state.todoItems
      ]
    });
  }
  checkCompleteLists() {
    const todoItem = this.state.todoItems;
    const todoItemsFilter = todoItem.filter((items) => items.isComplete === true);
    this.setState({
      button: 2,
      isCheckButton: "Active",
      complete: todoItemsFilter,
    })
  }
  clearItems() {
    const todoItem = this.state.todoItems;
    const todoItemsFilter = todoItem.filter((items) => items.isComplete !== true);
    this.setState({
      button: 0,
      todoItems: todoItemsFilter
    })
  }

  check(){
    const{todoItems} = this.state;
    for(let ma in todoItems){
      if(!todoItems[ma].isComplete){
        return false;
      }
    }
    return true;
  }



  render() {
    const { todoItems, newItem } = this.state;  
    return (
      <div className="App">
        <div className="Header">
          <img 
            className={classNames("checkAll",{
              "isCheck":  this.check()
            })} 
            src={checkMark} 
            width={32} 
            height={32} 
            onClick={this.allItemClick} />
          <input 
            type="text"
            placeholder="Add a item"
            value={newItem}
            onChange={this.onChange}
            onKeyUp={this.onKeyUp} />
        </div>
        <div>
          {
            this.state.button === 1 && this.state.active.map((item, index) =>
              <TodoItem
                key={index}
                item={item}
                onClick={this.onItemClick(item)}
                editItem={this.editItem(item)}
                deleteItem={this.deleteItem(item)}
              />)
          }
          {
            this.state.button === 2 && this.state.complete.map((item, index) =>
              <TodoItem
                key={index}
                item={item}
                onClick={this.onItemClick(item)}
                editItem={this.editItem(item)}
                deleteItem={this.deleteItem(item)}
              />)
          }
          {
            this.state.button === 0 && todoItems.map((item, index) =>
              <TodoItem 
                key={index} 
                item={item} 
                onClick={this.onItemClick(item)}
                editItem={this.editItem(item)}
                deleteItem={this.deleteItem(item)} 
              />)
          }
        </div>
        <div className="Footer">
          {
            todoItems.length > 0 && <Footer count={todoItems.length}
              isCheckButton={this.state.isCheckButton}
              checkCount={this.checkCountComplete()}
              checkAll={this.checkAllLists}
              checkActive={this.checkActiveLists}
              checkComplete={this.checkCompleteLists}
              clearItems={this.clearItems} />
          }
        </div>
      </div>
    );
  }
}

export default App;