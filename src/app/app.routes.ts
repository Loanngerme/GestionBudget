import { Routes } from '@angular/router';
import { HomeComponent } from './page/home/home.component';
import { CompteComponent } from './page/compte/compte.component';
import { TransactionComponent } from './page/transaction/transaction.component';
import { NotfoundComponent } from './page/notfound/notfound.component';
import { animation } from '@angular/animations';
import { LoginComponent } from './page/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { RegisterComponent } from './register/register.component';


export const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        component: HomeComponent,
        data: { animation: 'HomePage'}
    },
    {
        path: 'account',
        component: CompteComponent,
        canActivate: [AuthGuard],
        data: { animation: 'CompteComponent'}
    },
    {
        path: 'transaction',
        canActivate: [AuthGuard],
        component: TransactionComponent,
        data: { animation: 'CompteComponent'}
    },
    {
        path: 'login',
        component: LoginComponent,
        data: { animation: 'CompteComponent'}

    },
    {
        path: 'register',
        component: RegisterComponent,
        data: { animation: 'CompteComponent'}

    },
    {
        path: '**',
        component: NotfoundComponent
    }

];
