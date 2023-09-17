import { Helmet } from 'react-helmet-async';
import { useEffect, useState } from 'react';
import { faker } from '@faker-js/faker';
import Iconify from '../components/iconify';



// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';

// components

// sections
import {
  AppTasks,
  AppNewsUpdate,
  AppOrderTimeline,
  AppCurrentVisits,
  AppWebsiteVisits,
  AppTrafficBySite,
  AppWidgetSummary,
  AppCurrentSubject,
  AppConversionRates,
} from '../sections/@dashboard/app';

import CategoryIcon from '@mui/icons-material/Category';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import PublicIcon from '@mui/icons-material/Public';
import { useFetch } from "../hooks/useFetch";
import MultipleSelect from '../components/ModalInput'
import Card from '../components/Card'





// ----------------------------------------------------------------------

export default function DashboardAppPage() {


  

  const theme = useTheme();
  const [hoveredTitle, setHoveredTitle] = useState('Ajouter un nouveau');

  const handleWidgetHover = (title) => {
    setHoveredTitle(`Ajouter un nouveau ${title}`);
  };


  return (
    <>
      <Helmet>
        <title> Dashboard  </title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
        Home
        </Typography>
        
      <MultipleSelect/>

        <Grid container spacing={4}>
     
         {/*
          <Grid item xs={12} sm={6} md={4}>
          
            <AppWidgetSummary
              url="addCat"
              title="Catégorie"
              total={700}
              icon={<CategoryIcon />}
              onMouseEnter={() => handleWidgetHover('Category')}
              onMouseLeave={() => handleWidgetHover('')}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <AppWidgetSummary
              url="addClub"
              title="Clubs"
              total={1352831}
              color="test"
              icon={<SportsSoccerIcon />}
              onMouseEnter={() => handleWidgetHover('Clubs')}
              onMouseLeave={() => handleWidgetHover('')}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <AppWidgetSummary
              url="addLeague"
              title="Ligue"
              total={1723315}
              color="warning"
              icon={<EmojiEventsIcon />}
              onMouseEnter={() => handleWidgetHover('League')}
              onMouseLeave={() => handleWidgetHover('')}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <AppWidgetSummary
              url="AddCountry"
              title="Pays"
              total={234}
              color="error"
              icon={<PublicIcon />}
              onMouseEnter={() => handleWidgetHover('Country')}
              onMouseLeave={() => handleWidgetHover('')}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <AppWidgetSummary
              url="addtag"
              title="Tags"
              total={234}
              color="success"
              icon={<LocalOfferIcon />}
              onMouseEnter={() => handleWidgetHover('Tags')}
              onMouseLeave={() => handleWidgetHover('')}
            />
          </Grid> */} 
        
          <Grid className='Visits' item xs={12} md={6} lg={8}>
            <AppWebsiteVisits
              title="Website Visits"
              subheader="(+43%) than last year"
              chartLabels={[
                '01/01/2003',
                '02/01/2003',
                '03/01/2003',
                '04/01/2003',
                '05/01/2003',
                '06/01/2003',
                '07/01/2003',
                '08/01/2003',
                '09/01/2003',
                '10/01/2003',
                '11/01/2003',
              ]}
              chartData={[
                {
                  name: 'Team A',
                  type: 'column',
                  fill: 'solid',
                  data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
                },
                {
                  name: 'Team B',
                  type: 'area',
                  fill: 'gradient',
                  data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
                },
                {
                  name: 'Team C',
                  type: 'line',
                  fill: 'solid',
                  data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
                },
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits
              title="Current Visits"
              chartData={[
                { label: 'America', value: 4344 },
                { label: 'Asia', value: 5435 },
                { label: 'Europe', value: 1443 },
                { label: 'Africa', value: 4443 },
              ]}
              chartColors={[
                theme.palette.primary.main,
                theme.palette.info.main,
                theme.palette.warning.main,
                theme.palette.error.main,
              ]}
            />
          </Grid>


 

          <Grid item xs={12} md={6} lg={8}>
            <AppNewsUpdate
              title="News Update"
              list={[...Array(5)].map((_, index) => ({
                id: faker.datatype.uuid(),
                title: faker.name.jobTitle(),
                description: faker.name.jobTitle(),
                image: `/assets/images/covers/cover_${index + 1}.jpg`,
                postedAt: faker.date.recent(),
              }))}
            />
          </Grid>

 


 
        </Grid>
      </Container>
    </>
  );
}
