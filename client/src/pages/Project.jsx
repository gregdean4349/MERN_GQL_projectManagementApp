import { useQuery } from '@apollo/client'
import { useParams, Link } from 'react-router-dom'
import ClientInfo from '../components/ClientInfo'
import DeleteProjectButton from '../components/DeleteProjectButton'
import EditProjectForm from '../components/EditProjectForm'
import Spinner from '../components/Spinner'
import { GET_PROJECT } from '../queries/ProjectQueries'

export default function Project() {
  const { id } = useParams()

  const { loading, error, data } = useQuery(GET_PROJECT, {
    variables: { id },
  })

  if (loading) return <Spinner />
  if (error) return <p>Something went wrong!</p>

  const { project } = data

  return (
    <>
      {!loading && !error && (
        <div className='mx-auto w-75 card p-5'>
          <Link to='/' className='btn btn-light btn-sm w-25 d-inline ms-auto'>
            Back
          </Link>

          <h1 className=''>{project.name}</h1>
          <p>{project.description}</p>
          <h4 className='mt-3'>Project Status</h4>
          <p
            className={`lead ${
              project.status === 'Not Started' && 'text-danger'
            } ${project.status === 'Completed' && 'text-success'}`}
          >
            {project.status}
          </p>

          <ClientInfo key={project.id} client={project.client} />

          <EditProjectForm project={project} />

          <DeleteProjectButton projectId={project.id} />
        </div>
      )}
    </>
  )
}
