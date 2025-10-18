import { List, ListItem } from '@mui/material';
import { PageContainer } from '~/components/PageContainer';
import { FrameworkLink } from '~/framework/FrameworkLink';
import { ALL_ROUTES } from '~/main';

export function Directory() {
  const routesToRender: any[] = [];
  ALL_ROUTES.forEach((route) => {
    if (route?.children) {
      route?.children.forEach((child) => {
        routesToRender.push({ path: `${route.path}/${child.path}` });
      });
    } else {
      routesToRender.push(route);
    }
  });

  return (
    <PageContainer>
      <List>
        <a href="https://kit.uifoundations.com">
          <ListItem>Additional Kit Components</ListItem>
        </a>
        {routesToRender.map((route) => (
          <FrameworkLink to={route.path}>
            <ListItem key={route.path}>{route.path}</ListItem>
          </FrameworkLink>
        ))}
      </List>
    </PageContainer>
  );
}
