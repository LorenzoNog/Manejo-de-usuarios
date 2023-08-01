import { SortBy, User } from '../types'

interface Props {
    showColors: boolean;
    users: User[];
    handleDelete: (email:string) => void;
    changeSorting: (sort: SortBy) => void;
}

const UsersLists = ({changeSorting,showColors,users, handleDelete}: Props) => {
  return (
    <table className='w-[100%]'>
        <thead>
            <tr>
                <th>
                    Foto
                </th>
                <th className='cursor-pointer' onClick={() => changeSorting(SortBy.NAME)}>
                    Nombre
                </th>
                <th className='cursor-pointer' onClick={() => changeSorting(SortBy.LAST)}>
                    Apellido
                </th>
                <th className='cursor-pointer' onClick={() => changeSorting(SortBy.COUNTRY)}>
                    País
                </th>
                <th>
                    Acciones
                </th>
            </tr>
        </thead>
        <tbody>
            {
                users.map((user, index) => {
                    const backgroundColor = index % 2 === 0 ? '#333' : '#555'
                    const color = showColors ? backgroundColor : 'transparent'
                    return(
                        <tr key={user.email} className='text-white' style={{backgroundColor: color}}>
                            <td className='flex flex-col items-center'>
                                <img src={user.picture.thumbnail} />
                            </td>
                            <td className='text-center'> 
                                {user.name.first}
                            </td>
                            <td className='text-center'>
                                {user.name.last}
                            </td>
                            <td className='text-center'>
                                {user.location.country}
                            </td>
                            <td>
                                <button onClick={()=>{
                                    handleDelete(user.email)
                                }} className='bg-[#3d3c3c] rounded-xl p-2  text-white font-bold ml-[38%]'>Borrar</button>
                            </td>
                        </tr>
                    )
                })
            }
        </tbody>
    </table>
  )
}

export default UsersLists