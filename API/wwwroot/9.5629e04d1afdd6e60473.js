(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{xStk:function(t,e,n){"use strict";n.r(e),n.d(e,"AdminTypeModule",function(){return S});var i=n("SVse");class s{constructor(t){this.name="",Object.assign(this,t)}}var r=n("8Y7J"),c=n("lJxs"),o=n("AytR"),b=n("IheW");let a=(()=>{class t{constructor(t){this.http=t,this.baseUrl=o.a.apiUrl,this.types=[]}getTypes(){return this.http.get(this.baseUrl+"products/types").pipe(Object(c.a)(t=>(this.types=t,t)))}getTypeById(t){return this.http.get(this.baseUrl+"types/"+t)}createType(t){return this.http.post(this.baseUrl+"types",t)}updateType(t,e){return this.http.put(this.baseUrl+"types/"+t,e)}deleteType(t){return this.http.delete(this.baseUrl+"types/"+t)}}return t.\u0275fac=function(e){return new(e||t)(r.Zb(b.b))},t.\u0275prov=r.Lb({token:t,factory:t.\u0275fac,providedIn:"root"}),t})();var p=n("iInd"),d=n("2ZVE"),u=n("EApP"),l=n("s7LF");function y(t,e){1&t&&(r.Vb(0,"div"),r.Lc(1,"Name type is required"),r.Ub())}function m(t,e){if(1&t&&(r.Vb(0,"div",12),r.Jc(1,y,2,0,"div",13),r.Ub()),2&t){r.gc();const t=r.xc(10);r.Cb(1),r.mc("ngIf",null==t.errors?null:t.errors.required)}}const h=function(t){return{"is-invalid":t}};let f=(()=>{class t{constructor(t,e,n,i){this.route=t,this.adminService=e,this.router=n,this.toastr=i}ngOnInit(){}onSubmit(t){console.log(this.typeForm),"edit"===this.route.snapshot.url[0].path?this.adminService.updateType(this.route.snapshot.paramMap.get("id"),t).subscribe(t=>{this.router.navigate(["/admin-type"]),this.toastr.success("Update type successful")},t=>{this.toastr.error(t.message)}):this.adminService.createType(t).subscribe(t=>{this.router.navigate(["/admin-type"]),this.toastr.success("Create type successful")},t=>{this.toastr.error(t.message)})}}return t.\u0275fac=function(e){return new(e||t)(r.Pb(p.a),r.Pb(a),r.Pb(p.c),r.Pb(u.b))},t.\u0275cmp=r.Jb({type:t,selectors:[["app-edit-type-form"]],inputs:{typeForm:"typeForm"},decls:14,vars:6,consts:[[1,"container"],[1,"row"],[1,"col-lg-8"],[1,"mt-4",3,"ngSubmit"],["productForm","ngForm"],[1,"form-row"],[1,"form-group","col-md-8"],["for","name"],["required","","type","text","id","name","placeholder","Name","name","name",1,"form-control",3,"ngClass","ngModel","ngModelChange"],["ngname","ngModel"],["class","invalid-feedback",4,"ngIf"],["type","submit",1,"btn","btn-primary","my-3",3,"disabled"],[1,"invalid-feedback"],[4,"ngIf"]],template:function(t,e){if(1&t){const t=r.Wb();r.Vb(0,"div",0),r.Vb(1,"div",1),r.Vb(2,"div",2),r.Vb(3,"form",3,4),r.cc("ngSubmit",function(){r.Bc(t);const n=r.xc(4);return e.onSubmit(n.valid&&n.value)}),r.Vb(5,"div",5),r.Vb(6,"div",6),r.Vb(7,"label",7),r.Lc(8,"Name type"),r.Ub(),r.Vb(9,"input",8,9),r.cc("ngModelChange",function(t){return e.typeForm.name=t}),r.Ub(),r.Jc(11,m,2,1,"div",10),r.Ub(),r.Ub(),r.Vb(12,"button",11),r.Lc(13," Submit "),r.Ub(),r.Ub(),r.Ub(),r.Ub(),r.Ub()}if(2&t){const t=r.xc(4),n=r.xc(10);r.Cb(9),r.mc("ngClass",r.qc(4,h,n.invalid&&(n.dirty||n.touched)))("ngModel",e.typeForm.name),r.Cb(2),r.mc("ngIf",n.invalid&&(n.dirty||n.touched)),r.Cb(1),r.mc("disabled",!t.valid)}},directives:[l.y,l.n,l.o,l.b,l.u,i.l,l.m,l.p,i.n],styles:[""]}),t})(),g=(()=>{class t{constructor(t,e,n){this.adminService=t,this.route=e,this.router=n,this.type=new s}ngOnInit(){"edit"===this.route.snapshot.url[0].path&&this.loadType()}loadType(){const t=this.route.snapshot.paramMap.get("id")||"";this.adminService.getTypeById(t).subscribe(t=>{this.type=Object.assign({},t),console.log(this.type)})}}return t.\u0275fac=function(e){return new(e||t)(r.Pb(a),r.Pb(p.a),r.Pb(p.c))},t.\u0275cmp=r.Jb({type:t,selectors:[["app-edit-type"]],decls:9,vars:1,consts:[[1,"product-edit","mt-5"],[1,"container"],[1,"row"],[1,"col-12"],[1,"tab-panel"],[1,"product-tabset"],["heading","Edit Type"],[1,"col-lg-8"],[3,"typeForm"]],template:function(t,e){1&t&&(r.Vb(0,"section",0),r.Vb(1,"div",1),r.Vb(2,"div",2),r.Vb(3,"div",3),r.Vb(4,"div",4),r.Vb(5,"tabset",5),r.Vb(6,"tab",6),r.Vb(7,"div",7),r.Qb(8,"app-edit-type-form",8),r.Ub(),r.Ub(),r.Ub(),r.Ub(),r.Ub(),r.Ub(),r.Ub(),r.Ub()),2&t&&(r.Cb(8),r.mc("typeForm",e.type))},directives:[d.c,d.a,f],styles:[""]}),t})();var v=n("PSD3"),U=n.n(v);const V=function(t){return["edit",t]};function w(t,e){if(1&t){const t=r.Wb();r.Vb(0,"tr"),r.Vb(1,"th",15),r.Vb(2,"h5"),r.Lc(3),r.Ub(),r.Ub(),r.Vb(4,"td",15),r.Lc(5),r.Ub(),r.Vb(6,"td",15),r.Vb(7,"button",16),r.Lc(8," Edit "),r.Ub(),r.Ub(),r.Vb(9,"td",15),r.Vb(10,"button",17),r.cc("click",function(){r.Bc(t);const n=e.$implicit;return r.gc(2).deleteType(n.id)}),r.Lc(11,"Delete"),r.Ub(),r.Ub(),r.Ub()}if(2&t){const t=e.$implicit;r.Cb(3),r.Mc(t.id),r.Cb(2),r.Nc(" ",t.name," "),r.Cb(2),r.mc("routerLink",r.qc(3,V,t.id))}}const T=function(){return["/admin-type/create"]};function C(t,e){if(1&t&&(r.Vb(0,"section",1),r.Vb(1,"div",2),r.Vb(2,"div",3),r.Vb(3,"div",4),r.Vb(4,"div",5),r.Vb(5,"div",6),r.Vb(6,"header",7),r.Lc(7,"Type List"),r.Ub(),r.Vb(8,"button",8),r.Lc(9," Create new type "),r.Ub(),r.Ub(),r.Vb(10,"div",9),r.Vb(11,"table",10),r.Vb(12,"thead"),r.Vb(13,"tr"),r.Vb(14,"th",11),r.Vb(15,"div",12),r.Lc(16,"Id"),r.Ub(),r.Ub(),r.Vb(17,"th",11),r.Vb(18,"div",13),r.Lc(19,"Name"),r.Ub(),r.Ub(),r.Vb(20,"th",11),r.Vb(21,"div",12),r.Lc(22,"Edit"),r.Ub(),r.Ub(),r.Vb(23,"th",11),r.Vb(24,"div",12),r.Lc(25,"Delete"),r.Ub(),r.Ub(),r.Ub(),r.Ub(),r.Vb(26,"tbody"),r.Jc(27,w,12,5,"tr",14),r.Ub(),r.Ub(),r.Ub(),r.Ub(),r.Ub(),r.Ub(),r.Ub(),r.Ub()),2&t){const t=r.gc();r.Cb(8),r.mc("routerLink",r.pc(2,T)),r.Cb(19),r.mc("ngForOf",t.types)}}const L=[{path:"",component:(()=>{class t{constructor(t){this.typeService=t}ngOnInit(){this.getTypes()}getTypes(){return this.typeService.getTypes().subscribe(t=>{this.types=t,console.log(this.types)},t=>{console.log(t)})}deleteType(t){U.a.fire({title:"Are you sure?",text:"Do you want to really delete ?",icon:"warning",showCancelButton:!0,confirmButtonText:"Yes!",cancelButtonText:"No"}).then(e=>{e.value&&(this.typeService.deleteType(t).subscribe(e=>{this.types.splice(this.types.findIndex(e=>e.id===t),1)}),U.a.fire("Deleted!","User has been deleted.","success"))})}}return t.\u0275fac=function(e){return new(e||t)(r.Pb(a))},t.\u0275cmp=r.Jb({type:t,selectors:[["app-admin-type"]],decls:1,vars:1,consts:[["class","admin-page",4,"ngIf"],[1,"admin-page"],[1,"container"],[1,"row","justify-content-center"],[1,"col-lg-10"],[1,"col-auto"],[1,"d-flex","justify-content-between","my-3"],[1,"h2"],[1,"btn","btn-outline-success",3,"routerLink"],[1,"table-responsive"],[1,"table","center"],["scope","col"],[1,"p-2","text-uppercase","text-center"],[1,"py-2","text-uppercase","text-center"],[4,"ngFor","ngForOf"],[1,"align-middle","text-center"],[1,"btn","btn-warning",3,"routerLink"],[1,"btn","btn-danger",3,"click"]],template:function(t,e){1&t&&r.Jc(0,C,28,3,"section",0),2&t&&r.mc("ngIf",e.types)},directives:[i.n,p.d,i.m],styles:[""]}),t})()},{path:"create",component:g,data:{breadcrumb:"Create"}},{path:"edit/:id",component:g,data:{breadcrumb:"Edit"}}];let x=(()=>{class t{}return t.\u0275mod=r.Nb({type:t}),t.\u0275inj=r.Mb({factory:function(e){return new(e||t)},imports:[[p.g.forChild(L)],p.g]}),t})();var I=n("PCNd");let S=(()=>{class t{}return t.\u0275mod=r.Nb({type:t}),t.\u0275inj=r.Mb({factory:function(e){return new(e||t)},imports:[[i.c,I.a,x]]}),t})()}}]);