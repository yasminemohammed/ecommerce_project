import { CartComponent } from './cart/cart.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { ProfileGuard } from './profile.guard';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuard } from './auth.guard';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ShopComponent } from './shop/shop.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileInfoComponent } from './profile-info/profile-info.component';
import { AboutComponent } from './about/about.component'
import { OrderService } from './services/orders.service';
import { OrdersComponent } from './orders/orders.component';
import { PaymentComponent } from './payment/payment.component';
import { ContactusComponent } from './contactus/contactus.component';
// import { CheckOutComponent } from './checkout/checkout.component';



const routes: Routes = [
  {path:'home',component:HomeComponent},
  {path:'', redirectTo:'home', pathMatch:'full'},
  {path:'shop',component:ShopComponent},
  {path:'cart' ,component:CartComponent},
  {path:'productdetails/:proId/:catId',component:ProductDetailsComponent},
  {path:'register',  component:RegisterComponent},
  {path:'login' , component:LoginComponent},
  {path:'profile' , component:ProfileComponent},
  {path:'profile-info' ,  canActivate:[ProfileGuard], component:ProfileInfoComponent},
  {path:'dashboard' ,  canActivate:[ProfileGuard], component:DashboardComponent},
  {path:'about' , component:AboutComponent},
  {path:'orders' , component:OrdersComponent},
  {path:'payment' , component:PaymentComponent},
  {path:'contactUs' , component:ContactusComponent},


  // {path:'checkout' , component:CheckOutComponent},









];

@NgModule({
  imports: [RouterModule.forRoot(routes , { useHash: true }) ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
