import { Delete, Edit } from '@mui/icons-material'
import './handlePost.scss'
import { Link } from 'react-router-dom'


const HandlePost = () => {
  const user = true;
  return (
    <div className='handlePost'>
      {
        user  ? (
          <>
          <Link to='/editPost/:postId'  className='link'><Edit className='icons'/></Link>
          <Delete className='icons'/>
          </>
        ): ""
      }
      
    </div>
  )
}

export default HandlePost