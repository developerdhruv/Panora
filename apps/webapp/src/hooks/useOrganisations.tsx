import config from '@/utils/config';
import { useQuery } from '@tanstack/react-query';
import { organizations as Organisation } from 'api';

const fetchOrgs = async (): Promise<Organisation[]> => {
  const response = await fetch(`${config.API_URL}/organisations`);
  const a = await response.json();
  console.log(a[0].id_organization);
  
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
}

const useOrganisations = () => {
  return useQuery({
    queryKey: ['orgs'], 
    queryFn: fetchOrgs
  });
};
export default useOrganisations;
