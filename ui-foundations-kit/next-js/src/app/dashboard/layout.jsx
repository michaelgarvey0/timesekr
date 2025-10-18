import { DashboardLayout } from '../../components/DashboardLayout';
export default function DashboardPageLayout({ children }) {
    return <DashboardLayout>{children}</DashboardLayout>;
}
export const metadata = {
    title: 'Dashboard',
};
