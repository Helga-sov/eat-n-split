import { useState } from "react";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

export default function App() {
  const [formIsOpen, setFormIsOpen] = useState(false);
  const [friendName, setFriendName] = useState('');

  function handleAddClick() {
    return setFormIsOpen(!formIsOpen);
  }

  function handleCloseClick() {
    return setFormIsOpen(!formIsOpen);
  }

  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList />
        
        {formIsOpen ? <FriendForm  onCloseClick={handleCloseClick} friendName={friendName} onAddName={setFriendName} /> : <Button onClick={handleAddClick}>Add friend</Button>}
        
      </div>
    </div>
  );
}

function FriendsList() {
  const friends = initialFriends;
  return <ul>
    {friends.map(friend => (<Friend friend={friend} key={friend.id} />)
    )}
  </ul>
}

function Friend({friend}) {
  return (
    <li key={friend.id}>
      <h3>{friend.name}</h3>
      <img src={friend.image} alt='avatar' />
      <p className={`${friend.balance > 0 ? 'green' : friend.balance < 0 ?'red' : ''}`}>
        {friend.balance >= 0 ?  `${friend.name} owes you ${friend.balance}€`: friend.balance <= 0 ? `You owe ${friend.name} ${Math.abs(friend.balance)}€` : `You and ${friend.name} are even`}
      </p>
      <Button>Select</Button>
    </li>
  );
}

function FriendForm({onCloseClick, friendName, onAddName}) {

  function handleSubmit(e) {
    e.preventDefault();
  }
  return (
    <>
      <form className="form-add-friend" onSubmit={handleSubmit}>
        <label>👫Friend name</label>
        <input type='text' value={friendName} onChange={(e) => onAddName(e.target.value)} />
        <label>🌆Image URL</label>
        <input type='url' placeholder='https://i.pravatar.cc/48' onChange={(e) => console.log(e)} value='' />
        <Button>Add</Button>
      </form>
      <Button onClick={onCloseClick}>Close</Button>
    </>
  );
  
}

function Button({children, onCloseClick, handleAddClick}) {
  return <button className="button" onClick={onCloseClick}>{children}</button>;
}
