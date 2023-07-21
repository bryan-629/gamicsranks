import React, { useEffect } from 'react'
import { useAuthentication } from '../../Context/AuthProvider';
function Table({matches,handleClickDelete}) {
  const { user,showIdModal, isLoadingLoginUser, signInWithGoogle, signOutUser, getUser,setShowIdModal } = useAuthentication();
  const calculatePreviousPointDifferences = (match, index) => {
    if (index == matches.length -1) {
            return match.sr = match.srTotal
        }
    return (match.srTotal - matches[index +1].srTotal )
  };

  if (user && matches[0]) {
    if (user.id == matches[0].userID) {
        return (
            <table className="table table-dark table-striped">
                <thead>
                    <tr>
                        <th scope="col">Resultado</th>
                        <th scope="col">Fecha</th>
                        <th scope="col">Mode</th>
                        <th scope="col">Maps</th>
                        <th scope="col">Points</th>
                        <th scope="col">Kills</th>
                        <th scope="col">Deaths</th>
                        <th scope="col">SR</th>
                        <th scope="col">Total SR</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {matches.map((match,index)=>{
                        const fecha = new Date(match.date_time)
                        match.sr = calculatePreviousPointDifferences(match, index)
                       
                        return(
                            <tr className='' key={match.id} id={match.id}>
                                <th scope="row">{match.result}</th>
                                <td>{fecha.toLocaleDateString()}</td>
                                <td>{match.mode}</td>
                                <td>{match.map}</td>
                                <td>{match.points}</td>
                                <td>{match.kills}</td>
                                <td>{match.deaths}</td>
                                {match.sr > 0? (
                                    <td className='text-success'>{"+" + match.sr}</td>
                                ):(<td className='text-danger'>{match.sr}</td>)}
                                
                                <td>{match.srTotal}</td>
                                <td>
                                    <button className={`btn btn-danger mx-2 btn-sm ${match.id}`} onClick={(e)=>{handleClickDelete(e)}} size="sm">Delete</button>
                                </td>
                    </tr>
                        )
                    })}
                </tbody>
            </table>
            
          )
    }else {
        return (
            <table className="table table-dark table-striped">
                <thead>
                    <tr>
                        <th scope="col">Resultado</th>
                        <th scope="col">Fecha</th>
                        <th scope="col">Mode</th>
                        <th scope="col">Maps</th>
                        <th scope="col">Points</th>
                        <th scope="col">Kills</th>
                        <th scope="col">Deaths</th>
                        <th scope="col">SR</th>
                        <th scope="col">Total SR</th>
                    </tr>
                </thead>
                <tbody>
                    {matches.map((match,index)=>{
                        const fecha = new Date(match.date_time)
                        match.sr = calculatePreviousPointDifferences(match, index)
                       
                        return(
                            <tr className='' key={match.id} id={match.id}>
                                <th scope="row">{match.result}</th>
                                <td>{fecha.toLocaleDateString()}</td>
                                <td>{match.mode}</td>
                                <td>{match.map}</td>
                                <td>{match.points}</td>
                                <td>{match.kills}</td>
                                <td>{match.deaths}</td>
                                {match.sr > 0? (
                                    <td className='text-success'>{"+" + match.sr}</td>
                                ):(<td className='text-danger'>{match.sr}</td>)}
                                
                                <td>{match.srTotal}</td>
                                
                    </tr>
                        )
                    })}
                </tbody>
            </table>
            
          )
    }
  }


  
}

export default Table