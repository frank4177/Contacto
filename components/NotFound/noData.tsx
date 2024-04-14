import { Button } from '@mui/material';
import React from 'react'

interface INoDataProps {
  refetch?: () => Promise<void>;
}

const NoData = ({refetch}: INoDataProps) => {
  return (
    <div className='flex flex-col justify-center items-center space-y-5'>
        <span>No result found</span>
        <Button onClick={refetch}>Try again</Button>
    </div>
  )
}

export default NoData