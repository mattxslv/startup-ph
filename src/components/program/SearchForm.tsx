import Button from '@/ui/button/Button';
import Form from '@/ui/form/Form';
import Input from '@/ui/form/Input';
import React from 'react';

const getInitForm = () => ({
  query: '',
});

const SearchForm = () => {
  return (
    <Form onSubmit={() => {}} initialValues={getInitForm()} className='flex items-center gap-2'>
      <Input name='query' placeholder='Search...' className='h-12' />
      <Button variant='primary' type='submit' className='mb-2'>
        Search
      </Button>
    </Form>
  );
};

export default SearchForm;
