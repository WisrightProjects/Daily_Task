
import './App.css';
import Card from './components/Card';
import UserCard from './components/UserCard';
export default function App(){
 const follow=(n)=>alert("Following "+n);
 const users=[
 {name:'John Doe',email:'john@example.com',image:'https://via.placeholder.com/100',status:'Active',statusColor:'green'},
 {name:'Alice Smith',email:'alice@example.com',image:'https://via.placeholder.com/100',status:'Busy',statusColor:'orange'},
 {name:'David Lee',email:'david@example.com',image:'https://via.placeholder.com/100',status:'Offline',statusColor:'red'}
 ];
 return <div className="container">{users.map(u=><Card key={u.email}><UserCard {...u} onFollow={()=>follow(u.name)}/></Card>)}</div>
}
