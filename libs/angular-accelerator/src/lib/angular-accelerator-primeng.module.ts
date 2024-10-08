import { NgModule } from '@angular/core'
import { DropdownModule } from 'primeng/dropdown'
import { ButtonModule } from 'primeng/button'
import { DialogModule } from 'primeng/dialog'
import { PickListModule } from 'primeng/picklist'
import { SelectButtonModule } from 'primeng/selectbutton'
import { DataViewModule } from 'primeng/dataview'
import { TableModule } from 'primeng/table'
import { MenuModule } from 'primeng/menu'
import { ChartModule } from 'primeng/chart'
import { MultiSelectModule } from 'primeng/multiselect'
import { BreadcrumbModule } from 'primeng/breadcrumb'
import { SkeletonModule } from 'primeng/skeleton'
import { MessageModule } from 'primeng/message'
import { SharedModule } from 'primeng/api'
import { CheckboxModule } from 'primeng/checkbox'
import { FloatLabelModule } from 'primeng/floatlabel'

@NgModule({
  imports: [
    BreadcrumbModule,
    CheckboxModule,
    DropdownModule,
    ButtonModule,
    DialogModule,
    PickListModule,
    SelectButtonModule,
    DataViewModule,
    TableModule,
    MenuModule,
    ChartModule,
    MultiSelectModule,
    SkeletonModule,
    MessageModule,
    FloatLabelModule,
    SharedModule,
  ],
  exports: [
    BreadcrumbModule,
    CheckboxModule,
    DropdownModule,
    ButtonModule,
    DialogModule,
    PickListModule,
    SelectButtonModule,
    DataViewModule,
    TableModule,
    MenuModule,
    ChartModule,
    MultiSelectModule,
    SkeletonModule,
    MessageModule,
    FloatLabelModule,
    SharedModule,
  ],
})
export class AngularAcceleratorPrimeNgModule {}
