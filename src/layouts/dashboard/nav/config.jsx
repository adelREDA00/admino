// component
import SvgColor from '../../../components/svg-color';
import AddIcon from '@mui/icons-material/Add';
import CategoryIcon from '@mui/icons-material/Category';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import PublicIcon from '@mui/icons-material/Public';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';


// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'Tableau de bord',
    path: '/dashboard/addHome',
    icon: icon('ic_analytics'),
  },
  {
    title: 'Catégorie',
    path: '/dashboard/addCat',
    icon: <CategoryIcon />,
  },
  {
    title: 'Club',
    path: '/dashboard/addClub',
    icon: <SportsSoccerIcon />,
  },
  {
    title: 'Ligue',
    path: '/dashboard/addLeague',
    icon:<EmojiEventsIcon />,
  },
  {
    title: 'Pays',
    path: '/dashboard/AddCountry',
    icon: <PublicIcon />,
  },
  {
    title: 'Tag',
    path: '/dashboard/Addtag',
    icon: <LocalOfferIcon />,
  },
  {
    title: 'Players',
    path: '/dashboard/AddPlayer',
    icon: <DirectionsRunIcon />,
  },
  {
    title: 'Blog',
    path: '/dashboard/blog',
    icon: icon('ic_blog'),
  },
  {
    title: 'Utilisateurs',
    path: '/dashboard/user',
    icon: icon('ic_user'),
  },
  {
    title: 'Données',
    path: '/dashboard/app',
    icon: icon('ic_analytics'),
  },
/*  {
    title: 'product',
    path: '/dashboard/products',
    icon: icon('ic_cart'),
  },


  {
    title: 'Not found',
    path: '/404',
    icon: icon('ic_disabled'),
  },*/
];

export default navConfig;
