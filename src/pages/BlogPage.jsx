import { Helmet } from 'react-helmet-async';
// @mui
import { Grid, Button, Container, Stack, Typography } from '@mui/material';
// components
import Iconify from '../components/iconify';
import { BlogPostCard, BlogPostsSort, BlogPostsSearch } from '../sections/@dashboard/blog';
import { Link } from 'react-router-dom';
// mock
import POSTS from '../_mock/blog';
import { useFetch } from "../hooks/useFetch";

import { ProductSort, ProductFilterSidebar } from '../sections/@dashboard/products';
import { useState } from 'react';
import Tabel from '../components/Tabel'
import Switch from '@mui/material/Switch';


// ----------------------------------------------------------------------

const SORT_OPTIONS = [
  { value: 'latest', label: 'Latest' },
  { value: 'popular', label: 'Popular' },
  { value: 'oldest', label: 'Oldest' },
];

// ----------------------------------------------------------------------

export default function BlogPage() {
  const { data1, loading1, error1,reFetch } = useFetch(`https://apiblognode.onrender.com/api/posts/`);

  const postsArr = Array.isArray(data1) ? data1 : [];



  const [openFilter, setOpenFilter] = useState(false);

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  const [checked, setChecked] = useState(false);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  //edit 

  

  return (
    <>
      <Helmet>
        <title> Dashboard: Blog </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Blog
          </Typography>
          <Link to={`/dashboard/create `} style={{ textDecoration: 'none' }} >
            <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
            Nouveau post
            </Button>
          </Link>
        </Stack>

        <Stack mb={5} direction="row" alignItems="center" justifyContent="space-between">
          <BlogPostsSearch posts={POSTS} />




        </Stack>



        <Stack direction="row" flexWrap="wrap-reverse" alignItems="center" justifyContent="flex-end" sx={{ mb: 5 }}>
          <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
            <div className="view">
              <span>  {checked ? (
                `Tabel view`
              ) : (
                `Grid view`
              )}</span>
              <Switch
                checked={checked}
                onChange={handleChange}
                inputProps={{ 'aria-label': 'controlled' }}
              />
            </div>


            <ProductFilterSidebar
              openFilter={openFilter}
              onOpenFilter={handleOpenFilter}
              onCloseFilter={handleCloseFilter}
            />
            <ProductSort />

          </Stack>
        </Stack>

        {checked ? (
          <Tabel posts={postsArr}  reFetch={reFetch} />
        ) : (
          <Grid container spacing={3}>
            {postsArr.map((post, index) => (
              <BlogPostCard key={post._id} post={post} index={index} />
            ))}
          </Grid>
        )}
      </Container>
    </>
  );
}
