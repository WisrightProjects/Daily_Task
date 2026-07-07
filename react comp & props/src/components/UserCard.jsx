
import Avatar from './Avatar';
import Badge from './Badge';
import Button from './Button';
export default function UserCard({name,email,image,status,statusColor,onFollow}){
return <div style={{textAlign:'center',width:250}}>
<Avatar image={image} size={90}/>
<h2>{name}</h2>
<p>{email}</p>
<Badge text={status} color={statusColor}/>
<div style={{marginTop:15}}><Button text="Follow" color="royalblue" onClick={onFollow}/></div>
</div>}
