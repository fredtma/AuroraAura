'use strict'
var cor=angular.module('KingsServices',[,'ngResource']);

cor.factory('online',['$resource',online]).service('notitia',['$resource',notitia]).service('fetch',['$http',fetch]).service('crud',['notitia','$routeParams',crud]);
//############################################################################//
//ONLINE                                                                      //
//############################################################################//
function online($resource){
   var url=dynamis.get('SITE_NOTITIA'),data={};
   return {
      single:function(params,path,method,cache,type){url=path||url,type=type||'json';cache=cache||false,method=method||"POST";
         var data=$resource(url,{},{"query":{"method":method, "params":params,isArray:false,"cache":cache,"responseType":type}});
         return data;},
      multy:function(options){
         if(isArray(options)==false) {iyona.msg("Variable `option` is not an array"); return false;}
         var query={},l=options.length;
         for(var x=0;x<l;x++){
            for(var obj in options[x]) break; var object=options[x][obj];
            var post=object.post||"POST",params=object.params||{},isArray=object.isArray||false,cache=object.cache||false,type=object.type||"json",url=object.url||url;
            query[obj]={"method":post, "params":params,"isArray":isArray,"cache":cache,"responseType":type,"url":url};
            data[obj]=$resource(url,{},{"query":query[obj]});
         }//var data=$resource(url,{},query);
         return data;
      }
   }
}
//############################################################################//
//NOTITIA                                                                     //
//############################################################################//
function notitia($resource){
   var that=this,eternal=eternalCall();
   if(dynamis.get("CONFIG").openDatabase===false&&dynamis.get("CONFIG").indexedDB===false&&dynamis.get("CONFIG").Online===false)return false;
   if(eternal){that.name=eternal.form.field.name;that.frmName='frm_'+that.name;that.frmID='#frm_'+that.name;}
   that.patterns=dynamis.get("EXEMPLAR");
   var option={"users":0,"contacts":0,"version_db":0};//used in resetdb && iresetdb
   this.database=dynamis.get("loremIpsum");
   var IDBTransaction=window.IDBTransaction||window.webkitIDBTrasaction;
   var indexedDB=window.indexedDB||window.webkitIndexedDB||window.mozIndexedDB||window.msIndexedDB;
   var IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;
   //=========================================================================//SET DB AND VERSION
   if(dynamis.get("CONFIG").openDatabase)that.db=window.openDatabase(sessionStorage.DB_NAME,'',sessionStorage.DB_DESC,sessionStorage.DB_SIZE*1024*1024,function(){iyona.log('create a new DB')});
   if(dynamis.get("CONFIG").indexedDB&&false)indexedDB.deleteDatabase(sessionStorage.DB_NAME);
   if(dynamis.get("CONFIG").indexedDB)this.iRequest=indexedDB.open(sessionStorage.DB_NAME,parseInt(sessionStorage.DB_VERSION));
   if(dynamis.get("CONFIG").openDatabase&&that.db.version!=sessionStorage.DB_VERSION){
      iyona.log("Changing version.");
      that.version={};that.version.ver=sessionStorage.DB_VERSION;
      that.version.revision={"servers":1};
      that.db.changeVersion(
         that.db.version,sessionStorage.DB_VERSION,
         function(trans){
            //check if the new tables exists.
            for(var key in that.version.revision){var q="SELECT name FROM sqlite_master WHERE type='table' AND name='"+key+"'",newTables={};
               that.agito(q,{},"searching table "+key,function(results){if(results.rows.length==0){newTables[key]=true;that.resetDB(newTables); } });  }
            if(dynamis.get("CONFIG").Online&&false)version_db(that.db.version,that.version,trans)
         },//@todo
         function(e){iyona.log(e.message)},
         function(e){iyona.log('PASSED');});
         dynamis.set("DB",JSON.stringify(that.db),true);_$("footer").data("db version",1);
   }
   //=========================================================================//
   this.agito=function(_quaerere,_params,_msg,_callback,_reading){
      var params=_params||[];
      if(sessionStorage.quaerere&&that.basilia!==false)that.basilia=JSON.parse(sessionStorage.quaerere);
      if(_reading)that.db.transaction=that.db.readTransaction();
      that.db.transaction(function(trans){
         trans.executeSql(_quaerere,params,function(trans,results){
            if(_msg)iyona.log('Success DB transaction: '+_msg);console.log('%c'+_quaerere,'background:#222;color:#48b72a;width:100%;font-weight:bold;',params);
            var rows=that.db2json(results);
            if(_msg)notice("Successful: "+_msg);
            //================================================================//ONLINE
            if(that.basilia&&dynamis.get("CONFIG").Online)this.secondKings();

            if(_callback)_callback(results,rows);return true;
         },function(_trans,_error){
            if(_msg.search('no such table')!=-1){
               dynamis.del('DB',true);//@todo:fix this,ensure u give proper notification and create only missing
               _$('#userLogin .alert-info').removeClass('alert-info').addClass('alert-error').find('span').html('The application yet to be installed on this machine.<br/> We will run the installation on the next refresh')
            }
            iyona.log('Failed DB: '+_msg+':'+_error.message);
            console.log('%c ::QUAERERE='+_quaerere, 'background:#222;color:#ff0000;font-weight:bold;');
            notice("<div class='text-error'>"+_error.message+'</div>');return false;
         });
      });
      //================================================================//INDEXEDDB
      if(that.basilia&&dynamis.get("indexedDB"))this.setIndexedDB(_callback);
      sessionStorage.removeItem('quaerere');
   }
   //=========================================================================//
   this.db2json=function(_results,_type){
      var j={},row,col,len,x,k;
      switch(_type){
         case 1:break;
         case 2:break;
         default:
            len=_results.rows.length;
            for(x=0;x<len;x++){
               row=_results.rows.item(x);
               col=0;
               for(k in row){row[col]=row[k];col++;}
               j[x]=row;
            }//endfor
            j['rows']={"length":len,"source":"generated"}
            break;
      }//endswith
      return j;
    }
   //=========================================================================//
   this.creo=function(_actum,_jesua,callback){
      var precipio,actum,ubi,msg,val,alpha,mensa,Tau,res={};
      var quaerere=[],params=[],set=[];//field,value,? string
      var limit=1000;
      if(sessionStorage.active)eternal=JSON.parse(sessionStorage.active); else eternal=null;
      if(!eternal){iyona.log("not found json");return false;}
      var form='#frm_'+eternal.form.field.name;
      var modified=new Date();
      var jesua=_jesua;res={"blossom":{"delta":"!@=!#"},"modified":modified};
      mensa=eternal.mensa||form.substr(4);
      //======================================================================//GET FIELDS
      if(_actum!==0){
         angular.forEach(eternal.fields,function(field,properties){
            if(properties.field.type=='editor'&&(_actum==2||_actum==1)){val=CKEDITOR.instances[field].getData();}
            else val=_$(form+' #'+field).val()||_$(form+' [name^='+field+']:checked').val()||_$(form+' .active[name^='+field+']').val()||properties.field.value;//field,check,active,default
            alpha=alpha||val;//la premiere donner pour cree une donner pour jesua
            if(_actum!=3&&typeof _actum!=="undefined"&&val){
               if(that.sanatio(val,field,properties,_actum)===false){quaerere=[];return false;}
               if(properties.field.type=='password'){val=md5(_$(form+' #'+field).val())}
               if(properties.source!='custom'){params.push(val);res[field]=val;set.push("?");quaerere.push('`'+field+'`');}
            } else if(properties.source!='custom') {
               quaerere.push('`'+field+'`');
            }
         });
         if(quaerere.length==0)return false;//pas de donner trouver, surment une erreur de value
      }//endif_actum!=0
      //======================================================================//
      switch(_actum){
         case 0:
            this.constraintForeignKey(jesua,mensa);
            actum='DELETE FROM '+mensa+' WHERE jesua=?';
            Tau='oMegA';res['blossom']['alpha']=jesua;setQuaerere(mensa,res,Tau);
            setTimeout(function(){that.agito(actum,[jesua],'Deleted record from '+mensa,callback)},15);break;
         case 1:
            var r=Math.floor((Math.random()*179)+1);
            alpha=md5(alpha+modified+r);
            quaerere.push('jesua');set.push('?');params.push(alpha);
            quaerere.push('modified');set.push('?');params.push(modified);
            _$('footer').data('jesua',alpha);//@see: insert it replacesinsertId
            Tau='Alpha';res['blossom']['alpha']=alpha;res['creation']=modified;
            actum='INSERT INTO '+mensa+' ('+quaerere.join()+')VALUES('+set.join()+')';
            msg='record added to '+mensa;break;
         case 2:
            val=_$(form+' #name').val()||_$(form+' #username').val();//get the reference field
            if(val)this.constraintForeignKey(jesua,mensa,val);//update reference field
            Tau='deLta';res['blossom']['alpha']=jesua;
            actum='UPDATE '+mensa+' SET '+quaerere.join('=?,')+'=? WHERE jesua=?';params.push(jesua);
            msg='record updated in '+mensa;break;
         case 3:
         default:
            params=[];
            ubi=('quaerere' in eternal.hasOwnProperty() && 'ubi' in eternal.quaerere)?eternal.quaerere.ubi:'';//wen there is a physical search included
            precipio=('quaerere' in eternal&&'precipio' in eternal.quaerere&&eternal.quaerere.precipio)?" ORDER BY "+eternal.quaerere.precipio:'';//wen there is an order
            if(jesua){
               params.push(jesua);ubi=' WHERE jesua=? '+ubi+' '+precipio+' LIMIT '+limit;
            }else{
               ubi=' WHERE 1=1 '+ubi+' '+precipio+' LIMIT '+limit;//ADD the where clasue in both
            }
            quaerere.push('jesua');quaerere.push('id');
            actum='SELECT '+quaerere.join()+' FROM '+mensa+ubi;
            msg='Selected '+mensa;break;
      }setQuaerere(mensa,res,Tau);
      if(quaerere.length>0)this.agito(actum,params,msg,callback);
   }
   //=========================================================================//
   this.sanatio=function(_val,_field,_properties,_actum){
      var ele=_$(that.frmID+' #'+_field)[0]||_$('.'+this.frmName+'_'+_field+' .btn-group')[0];
      var type=_properties.field.type;
      var err=creo('span',{"clss":"help-block error-block"});
      var title=_properties.field.title||_properties.title||'';
      var omega=true;var msg;
      if(!_val&&_properties.field.required=="new"&&_actum==2);//seulment avec une nouvelle donner
      else if(!_val&&"required" in _properties.field) {msg='Missing `'+_field+'`';omega=false;}
      else if (!sessionStorage.formValidation){
         if(_properties.pattern&&_val.search(this.patterns[_properties.pattern][0])==-1){msg=title+', '+this.patterns[_properties.pattern][1];omega=false;}
         else if(_properties.field.pattern&&_val.search(_properties.field.pattern)==-1){msg=title+', missing a requirment';omega=false;}
         else if(type=="email"&&_val.search(this.patterns["email"][0])==-1){msg=title+', '+this.patterns["email"][1];omega=false;}
         else if(type=="number"&&_val.search(this.patterns["number"][0])==-1){msg=title+', '+this.patterns["number"][1];omega=false;}
         else if(type=="color"&&_val.search(this.patterns["color"][0])==-1){msg=title+', '+this.patterns["color"][1];omega=false;}
         else if(type=="url"&&_val.search(this.patterns["url"][0])==-1){msg=title+', '+this.patterns["url"][1];omega=false;}
         else if(type=="date"&&_val.search(this.patterns["fullDate"][0])==-1){msg=title+', '+this.patterns["fullDate"][1];omega=false;}
      }
      else if(type=="password"&&_val.search(this.patterns["password"][0])==-1){msg=title+', '+this.patterns["password"][1];omega=false;}
      if(type=="password"&&_$('#signum').length&&_val&&_val!==_$('#signum').val()){msg=title+' passwords do not match';omega=false;}
      if(omega===false){ele.parentNode.insertBefore(err, ele.nextSibling);err.innerHTML=msg;_$('#notification').html('<div class="text-error">'+msg+'</div>');_$('.control-group.'+this.frmName+'_'+_field).addClass('error');}
      return omega;
   }
   //=========================================================================//
   this.constraintForeignKey = function(_jesua,_mensa,_Tau) {
      var l,x,l2,x2;
      var omega=[],alpha=[],delta=[];var tt=['users','groups','permissions'];//to speed up process on pf table
      if(tt.indexOf(_mensa)==-1) return false;
      switch (_mensa) {
         case'users':
            omega.push({"mensa":"link_users_groups","child":"user","parent":"username"});omega.push({"mensa":"link_permissions_users","child":"user","parent":"username"});break;
         case'groups':
            omega.push({"mensa":"link_users_groups","child":"`group`","parent":"name"});omega.push({"mensa":"link_permissions_groups","child":"`group`","parent":"name"});break;
         case'permissions':
            omega.push({"mensa":"link_permissions_groups","child":"`permission`","parent":"name","sub":true});omega.push({"mensa":"link_permissions_users","child":"`permission`","parent":"name","sub":true});break;
      }
      try{
         if(_Tau){
            l=omega.length;
            for(x=0;x<l;x++)this.agito("UPDATE "+omega[x].mensa+" SET "+omega[x].child+"=? WHERE "+omega[x].child+" IN (SELECT "+omega[x].parent+" FROM "+_mensa+" WHERE jesua=?  )",[_Tau,_jesua], "Ref updated "+omega[x].child+" from:"+_mensa);
         }else{
            l=omega.length;
            for(x=0;x<l;x++){
               if(omega[x].sub){
                  this.agito("SELECT id,name,jesua FROM "+_mensa+" WHERE sub=?",[_jesua],'',function(r,j){
                     if(j.rows.length){l2=j.rows.length;
                        for(x2=0;x2<l2;x2++){iyona.log(j[x2],"j[x2]");this.constraintForeignKey(j[x2]['jesua'],_mensa,false);}//end for
                     }//endif row
                  });
               }//if sub
               this.agito("DELETE FROM "+omega[x].mensa+" WHERE "+omega[x].child+" IN (SELECT "+omega[x].parent+" FROM "+_mensa+" WHERE jesua=?  )",[_jesua],"Ref deleted "+omega[x].child+" from:"+_mensa);
            }//for omega
         }//if Tau
      } catch (err) {iyona.log("Error selecting reference:" + err.message)}
   }
   //=========================================================================//
   /*
 * used to place content in the input fields and display heading
 * @param {obeject} <var>_source</var> the source of the object
 * @param {string} <var>_form</var> the name of the form
 * @param {bool} <var>_head</var> only the head to be displayed
 * @param {bool} <var>_reference</var> used to search either the main table or reference child table
 * @returns {array} the list of header
 * @todo add radio and check return
 */
   this.fieldsDisplay=function(_from,_source,_head,_reference){
      var tmp,type,key2;
      var fields=!_reference?eternal.fields:eternal.children[_reference].fields;
      var frmID=that.frmID;
      if(_reference)frmID=frmID+2;
      var c=0;
      var _return=[];
      if(typeof _source==="number"){tmp=JSON.parse(sessionStorage.activeRecord);_source=tmp[_source];}
      angular.forEach(fields,function(key,property){
         key2=key.replace(/\s/ig,'');//removes spaces
         if(_reference) type=property.type||eternal.children[_reference].global.type;
         else type=(property.field&&property.field.type)?property.field.type:(property.complex)?property.complex:'';
         if(_head && !property.header) return true;
         switch(type){
            case 'radio':
            case 'bool':
            case 'check':
               if(_from==='form')_$(frmID+' [name^='+key2+']').each(function(){if(_$(this).val()==_source[key]||_$(this).text()==_source[key])_$(this).addClass('active').prop('checked',true);else _$(this).removeClass('active').prop('checked',false);});
               else if(_from==='list')_$(frmID+' [name^='+key2+']').each(function(){if(_$(this).prop('checked')||_$(this).hasClass('active'))_return[c]=_$(this).addClass('active').prop('value');});
               else _return[c]=_source[key2];
               break;
            case 'p':
            case 'span':
               if(_from==='form'&&_source[key])_$(frmID+' #'+key2).html(_source[key]);
               else _return[c]=_source[key];
               break;
            case 'password':_$(frmID+' #'+key2).prop("required",false);_$(frmID+' #signum').prop("required",false);break;
            default:
               if(_from==='form'&&_source[key]){_$(frmID+' #'+key2).val(_source[key]);if(key2=='password'&&document.getElementById('signum'))document.getElementById('signum').value=_source[key]}
               else if(_from==='list')_return[c]=_$(frmID+' #'+key2).val();
               else _return[c]=_source[key2];
               break;
         }//endswitch
         c++;
      });
      return _return;
   }
   //=========================================================================//
   this.resetDB=function(_option){
      if(angular.isString(_option)&&option.hasOwnProperty(_option))option[_option]=true; else if (_option===true)option=true; else if(angular.isObject(_option))option=_option;
      for (var table in this.database){iyona.deb(table,"creating",option,option[table]);
         if(option[table]||option===true){
            var mensa=this.database[table],quaerere='',ref='',l,x,indexes=[],references=[],names=[];
            that.agito("DROP TABLE "+table,[],"DROP table "+table);
            if(mensa.defaults)angular.extend(mensa.fields,mensa.defaults);
            for(var field in mensa.fields){
               var current=mensa.fields[field];
               quaerere+="`"+field+"` "+current.type;names.push(field);
               if(current.key===true)quaerere+=" PRIMARY KEY AUTOINCREMENT";
               if(current.key==="unique")quaerere+=" PRIMARY KEY";
               if(current.null)quaerere+=" NOT NULL";
               if(current.unique)quaerere+=" UNIQUE";
               if(current.default)quaerere+=" DEFAULT "+current.default;
               if(current.ndx)indexes.push("CREATE INDEX "+current.ndx+" ON "+table+"(`"+field+"`)");
               if(current.ref)references.push("FOREIGN KEY (`"+field+"`) REFERENCES "+current.ref['table']+"("+current.ref['field']+")");
               quaerere+=",";
            }//foreach
            quaerere=quaerere.substr(0,quaerere.length-1);
            if(references.length>0)ref=","+references.join(','); else ref='';
            var sql="CREATE TABLE IF NOT EXISTS "+table+"("+quaerere+ref+")";
            that.agito(sql,[],"Table "+table+" created");
            l=indexes.length;for(x=0;x<l;x++){that.agito(indexes[x],[],"Index created");}
            that.novaNotitia(table,"get"+table,names);
         }//if table
      }//for database
   }
   //=========================================================================//
   this.novaNotitia=function(_mensa,_comand,_fields){
      var fields='',values=[],sql;var x,l,f=[],n=[];
      var data=$resource(dynamis.get("SITE_SERVICE"),{},{"query":{"method":"POST", "params":_comand,isArray:false,"cache":false,"responseType":"json"}});
//      iyona.deb(data.query(),'data',data.get());
//      $http({url:dynamis.get("SITE_SERVICE"),data:{militia:_comand},method:"POST",responseType:'json'}).success(function(json,status,headers,config){
//         l=_fields.length;iyona.deb(json);
//         for(x=0;x<l;x++){f.push('?');n.push('`'+_fields[x]+'`');}
//         $.each(json,function(i,v){
//            if(i==='rows')return true;
//            l=_fields.length;
//            for(x=0;x<l;x++){values.push(v[_fields[x]]);}
//            if(_comand=="getUsers")v.gender=v.gender=='Male'?'1':'2';
//            fields+=fields==''?"SELECT "+f.join():" UNION SELECT "+f.join();
//         });
//         sql="INSERT INTO "+_mensa+" ("+n.join()+") "+fields;
//         that.agito(sql,values,"added "+_mensa);
//      }).error(function(jqxhr,textStatus,error){var err=textStatus+','+error;iyona.log('failed to get json:'+err)});
   }
   //=========================================================================//
   /**
   * update text in table from a single field
   * @author fredtma
   * @version 4.3
   * @category update, notitia
   * @param object <var>_set</var> the object containing the field to be updated
   * @return void
   */
   this.deltaNotitia=function(_set){
      var agrum=_set.className.replace(/col_/,'');
      var jesua=_$(_set).parents('tr').data('jesua');
      var name=eternal.form.field.name;
      var valor=_$(_set).text();
      var t = new Date().format('isoDateTime');//var jesua=md5(valor+t);
      var delta='UPDATE `'+eternal.mensa+'` SET `'+agrum+'`=?,modified=? WHERE jesua=?';var msg='  Updated field '+agrum;
      var quaerere={};quaerere.eternal={'blossom':{"alpha":jesua,"delta":"!@=!#"},"modified":t};quaerere.eternal[agrum]=valor;
      quaerere.Tau='deLta';quaerere.iyona=eternal.mensa;sessionStorage.quaerere=JSON.stringify(quaerere);
      this.agito(delta,[valor,t,jesua],msg,function(){
         _$('.table-msg-'+name).html(msg).animate({opacity:0},200,"linear",function(){_$(this).animate({opacity:1},200);});
      });
   }
   //=========================================================================//
   /**
    * when a new row is created via a table
    * @author fredtma
    * @version 4.5
    * @category insert, db
    * @param object <var>_row</var> the row containing the default data
    * @param object <var>_tr</var> the new row created
    */
   this.alphaNotitia=function(_row,_tr){
      var fields,field;var name=eternal.form.field.name;
      if(eternal.child) {for (fields in eternal.child) break; fields=eternal.child[fields].fields}//child et seulment un seul.
      else fields=eternal.fields;
      var valor = Math.floor((Math.random()*100)+1);
      var t = new Date().format('isoDateTime');var jesua=md5(valor+t);
      var agris=['jesua','modified']; valor=[jesua,t]; var res={"jesua":jesua,"modified":t};
      //get all the fields set in the config, takes value from colums if it exist, other wise from the default config or null
      for(field in fields){agris.push('`'+field+'`');if(_row[field]){val=_row[field]}else{var val=fields[field].value||'';}valor.push(val);res[field]=val;}
      var l=agris.length;var q=[],x; for(x=0;x<l;x++)q.push('?');
      var delta='INSERT INTO `'+eternal.mensa+'` ('+agris+') VALUES ('+q.join()+')';var msg='  New record created ';
      var quaerere={};quaerere.eternal=res;
      quaerere.Tau='Alpha';quaerere.iyona=eternal.mensa;sessionStorage.quaerere=JSON.stringify(quaerere);
      this.agito(delta,valor,msg,function(r,j){
         var iota=jesua||r.insertId;
         _$(_tr).data('jesua',iota);
         _$('.table-msg-'+name).html(msg).animate({opacity:0},200,"linear",function(){_$(this).animate({opacity:1},200);});
      });
      return true;
   }
   //=========================================================================//
   /**
    * removes a row from the db and table
    * @author fredtma
    * @version 4.6
    * @category delete, database
    * @param object <var>_set</var> the element cliented
    * @param integer <var>_iota</var>
    */
   this.omegaNotitia=function(_set){
      var name=eternal.form.field.name;
      var jesua=_$(_set).parents('tr').data('jesua');
      _$(_set).parents('tr').hide();var msg = " Record removed ";
      var quaerere={"eternal":{"blossom":{"alpha":jesua,"delta":"!@=!#"}},"iyona":eternal.mensa,"Tau":"oMegA"};sessionStorage.quaerere=JSON.stringify(quaerere);
      this.agito("DELETE FROM "+eternal.mensa+" WHERE jesua=?",[jesua],msg,function(){
         _$('.table-msg-'+name).html(msg).animate({opacity:0},200,"linear",function(){_$(this).animate({opacity:1},200);});
      });
   };
   //=========================================================================//
   this.notitia=function(_reset){
      that.reset=_reset||false;
      if(that.reset){
      //callWorker({"novaNotitia":true});
      that.resetDB(that.reset);}
   }
   //=========================================================================//
   if(dynamis.get("CONFIG").openDatabase&&!dynamis.get("DB",true)){
      dynamis.set("DB",JSON.stringify(that.db),true);
//      callWorker({"novaNotitia":true});
      this.resetDB(true);
   }
   //=========================================================================//
   this.setIndexedDB=function(callback){
      that.basilia;
      this.iRequest;
      //================================================================//ONLINE
      if(that.basilia&&dynamis.get("CONFIG").Online)get_ajax(sessionStorage.SITE_MILITIA,that.basilia,'','post','json',function(j){iyona.log(j,'Online');});
   }
   if(this.iRequest){
      this.iRequest.onerror=function(e){iyona.log("Database error code: "+e.target.error.message, e);}
      this.iRequest.onsuccess=function(e){this.idb=this.iResult||e.target.result||this.iRequest.result;iyona.log("Created iDB")}
      this.iRequest.onupgradeneeded=function(e){iyona.log("Upgrading DB")
         this.idb=e.target.result;
         if(e.oldVersion < sessionStorage.DB_VERSION){/*do changes for lower version*/}
         if(this.idb.version < 5){/*do changes for lower version*/}
         that.iResetDB(true,e);
      }
   }//if this.iRequest
   //=========================================================================//
   this.iResetDB=function(_option,e){
      if(that.iRequest.readyState!="done"){that.iRequest.addEventListener("success",function(){that.iResetDB(_option,e)},false); return false;}
      else {this.idb=that.iRequest.result;}

      var column;
      if(angular.isString(_option)&&option.hasOwnProperty(_option))option[_option]=true; else if (_option===true)option=true; else if(angular.isObject(_option))option=_option;
      for(var table in that.database){
         if(option[table]||option===true){
            var mensa=that.database[table];iyona.deb(table,'table');
            if(mensa.defaults)angular.extend(mensa.fields,mensa.defaults);
            if(this.idb.objectStoreNames.contains(table)!==true){
               column=that.iRequest.result.createObjectStore(table,{keyPath:"jesua"});
               for(var field in mensa.fields){//@note:no need to add column as the store is dynamic.
                  var current=mensa.fields[field]; if(field==='jesua')continue;
                  //column.add(field);@todo::add data from online
                  //var data=$resource(dynamis.get("SITE_SERVICE"),{},{"query":{"method":"POST", "params":"get"+table,isArray:false,"cache":false,"responseType":"json"}});
                  if(current.unique) column.createIndex('uniq'+field,field,{unique:true});//keyname,keypath
                  if(current.ndx) column.createIndex(current.ndx,field);
               }//for field in mensa.fields
            }else{//to update
               column=that.iRequest.transaction.objectStore(table);
               for(var field in mensa.fields){//@note:no need to add column as the store is dynamic.
                  var current=mensa.fields[field];
                  try{
                     if(current.unique&&!column.index('uniq'+field)) column.createIndex('unique'+field,field,{unique:true});
                     if(current.ndx&&!column.index(column.ndx)) column.createIndex(current.ndx,field);
                  }catch(e){iyona.log("An error occured in creting the index::"+e.message, e)}

               }//for field in mensa.fields
            }
            that.iRequest.transaction.onerror=function(e){iyona.log("A database error code: "+e.target.errorCode,e);}
         }//if if(option[table]||option===true)
      }//for table in that.database
   }
   //=========================================================================//
   this.iWrite=function(_store,_add,_update){
      if(that.iRequest.readyState!="done"){that.iRequest.addEventListener("success",function(){that.iWrite(_store,_add,_update)},false); return false;}
      else {this.idb=that.iRequest.result;}

      var store=_store||"users",transaction=this.idb.transaction(store,"readwrite"),request;
      var objectStore=transaction.objectStore(store);
      if(typeof _add!=="object") return false;

      if(!_update){request=objectStore.add(_add);iyona.deb("inserting in idb");}
      else {request=objectStore.put(_add);iyona.deb("updating in idb");}
      request.onsuccess=function(e){iyona.log("Successfully added to "+store);that.secondKings();}
      request.oncomplete=function(e){iyona.log("Successfully completed addeding to "+store+"::"+e.target.error.message);}
      request.onerror=function(e){iyona.log("Error while writing to "+store+"::"+e.target.error.message);}
   }
   //=========================================================================//
   this.iRead=function(_store,_index,_callback){
      if(that.iRequest.readyState!="done"){that.iRequest.addEventListener("success",function(){SET.read(_store,_callback,_index)},false); return false;}
      else {this.idb=that.iRequest.result;}

      var store=_store||"users",transaction=this.idb.transaction(store),request;
      var objectStore=transaction.objectStore(store);

      if(typeof _index=="object"&&_index.hasOwnProperty("where"))var ndx=objectStore.index(_index.where);
      if(typeof _index=="object"&&_index.hasOwnProperty("order"))var order=(_index.order.search(/desc/i)!=-1||_index.order.search(/prev/i)!=-1)?'prev':null;
      if(typeof _index=="number"){request=objectStore.get(_index);
      }else if(typeof _index=="object"&&_index.hasOwnProperty("top")){var keyRange=IDBKeyRange.lowerBound(_index.top); request=objectStore.openCursor(keyRange,order);
      }else if(typeof _index=="object"&&_index.hasOwnProperty("bot")){var keyRange=IDBKeyRange.upperBound(_index.bot); request=objectStore.openCursor(keyRange,order);
      }else if(typeof _index=="object"&&_index.hasOwnProperty("between")){var keyRange=IDBKeyRange.bound(_index.between[0],_index.between[1],true,true); request=ndx.openCursor(keyRange,order);
      }else if(typeof _index=="object"&&_index.hasOwnProperty("is")){request=ndx.get(_index.is);
      }else if(typeof _index=="object"&&_index.hasOwnProperty("like")){var keyRange=IDBKeyRange.bound(_index.like,_index.like+'\uffff'); request=ndx.openCursor(keyRange,'prev');
      }else{request=objectStore.openCursor();}

      request.onsuccess=_callback;//e.target.result
      request.oncomplete=function(e){iyona.log("Successfully completed addeding to "+store,e);}
      request.onerror=function(e){iyona.log("Error while writing to "+store+"::"+request.error,e);}
   }
   //=========================================================================//
   this.iErase=function(_store,_index,_callback){
      if(that.iRequest.readyState!="done"){that.iRequest.addEventListener("success",function(){SET.erase(_store,_index,_callback)},false); return false;}
      else {this.idb=that.iRequest.result;}

      var store=_store||"users",transaction=this.idb.transaction(store,"readwrite");
      var objectStore=transaction.objectStore(store);
      var request=objectStore.delete(_index);
      request.onsuccess=function(e){iyona.log("Successfully deleted record.");if(_callback)_callback();that.secondKings();}
      request.onerror=function(e){iyona.log("failed to deleted record.",e);}
   }
   //=========================================================================//
   this.firstKings=function(mensa,scope,tau,callback,options){//@todo: add offline message//@todo:validation this.sanatio
      var field,params=[],fields=[],set=[],res={},consuetudinem={},val,modified=new Date(),quaerere,msg,ubi,precipio,limit=10,reading;
      var jesua,alpha;var r=Math.floor((Math.random()*179)+1);
      if(scope["jesua"]){jesua=scope["jesua"];alpha=scope["jesua"];}else{scope["jesua"]=0;alpha=0}
      for (field in scope){
         val=scope[field];
         if (field in that.database[mensa].defaults || field in that.database[mensa].fields || "eta" in val); else {consuetudinem[field]=val; continue;}//consuetudinem:custom fields and fields that are predefined
         jesua=jesua||md5(val+modified+r);
         if(field=="jesua"&&(tau=='Alpha'||alpha)){//set jesua for all transc//if u r inserting, 4 update & select u need an original value
            val=jesua;scope["jesua"]=jesua;
            res['blossom']={"delta":"!@=!#","alpha":jesua};
         }else if(field=="modified"&&tau=='deLta'){}
         else{
            res[field]=val;
            if(angular.isObject(val))val=val.alpha;
            params.push(val);fields.push('`'+field+'`');set.push("?");}
      }
      angular.extend(consuetudinem,options);
      that.basilia=setQuaerere(mensa,res,tau,consuetudinem);iyona.deb(res,'res',scope,'scope',JSON.parse(that.basilia),'basilia',alpha,jesua,params,fields,set,tau,"II",consuetudinem);
      //----------------------------------------------------------------------//INDEXEDDB
      if(dynamis.get("CONFIG").indexedDB){
         switch(tau){
            case"omegA":this.iErase(mensa,jesua,callback);
            case"Alpha":this.iWrite(mensa,scope,false);
            case"deLta":this.iWrite(mensa,scope,true);
            default:this.iRead(mensa,jesua,callback);
         }
      //----------------------------------------------------------------------//WEBSQL
      }else if(dynamis.get("CONFIG").openDatabase){
         switch(tau){
            case "omegA":
   //            this.constraintForeignKey(jesua,mensa);@todo
               quaerere='DELETE FROM '+mensa+' WHERE jesua=?';
               setTimeout(function(){that.agito(quaerere,[jesua],'Deleted record from '+mensa,callback)},15);break;
            case "Alpha":
               _$('footer').data('jesua',jesua);//@see: insert it replacesinsertId
               quaerere='INSERT INTO '+mensa+' ('+fields.join()+')VALUES('+set.join()+')';
               msg='record added to '+mensa;break;
            case "deLta":
               val=scope['name']||scope['username'];//get the reference field
   //            if(val)this.constraintForeignKey(jesua,mensa,val);//update reference field @todo
               quaerere='UPDATE '+mensa+' SET '+fields.join('=?,')+'=? WHERE jesua=?';
               msg='record updated in '+mensa;break;
            case 3:
            default:
               params=[];reading=true;
               ubi=('quaerere' in eternal.hasOwnProperty() && 'ubi' in eternal.quaerere)?eternal.quaerere.ubi:'';//wen there is a physical search included
               precipio=('quaerere' in eternal&&'precipio' in eternal.quaerere&&eternal.quaerere.precipio)?" ORDER BY "+eternal.quaerere.precipio:'';//wen there is an order
               if(alpha){ubi=' WHERE jesua=? '+ubi+' '+precipio+' LIMIT '+limit;}
               else{ubi=' WHERE 1=1 '+ubi+' '+precipio+' LIMIT '+limit;}//ADD the where clasue in both
               quaerere='SELECT '+quaerere.join()+' FROM '+mensa+ubi;
               msg='Selected '+mensa;break;
         }
         this.agito(quaerere,params,msg,callback,reading);
      }else{
         this.secondKings(callback);
      };

   }//end firstKing
   //=========================================================================//ONLINE
   this.secondKings=function(callback){
      if(dynamis.get("CONFIG").Online){
         that.basilia=that.basilia||dynamis.get("quaerere",true);//,"headers":{"Content-Type":"application/x-www-form-urlencoded"}
         var service=$resource(dynamis.get("SITE_MILITIA"),{},{"militia":{"method":"POST" ,isArray:false,"cache":false,"responseType":"json","withCredentials":true}});
         if(!PASCO&&dynamis.get("CONFIG").isOnline){service.militia(that.basilia,function(j){
               iyona.deb(typeof j.notitia.idem,'j.notitia.idem');
               iyona.deb(j.notitia.idem,'j.notitia.idem',j.notitia.idem!=0,j.notitia.idem!='0');
               if(j.notitia)iyona.log(j.notitia.sql);
               if(j.notitia&&j.notitia.idem!='0'){var u=dynamis.get("USER_NAME",true);u.cons=j.notitia.idem;dynamis.set("USER_NAME",u,true)}//pour maitre un autre biscuit
               iyona.log(j,'Online');if(typeof callback=="function")callback(j);});}
         else if(!dynamis.get("CONFIG").isOnline){iyona.msg("You are currently offline",true,"danger bold");}
         else if(PASCO){var Connection=checkConnection();
            if(Connection==Connection.NONE){iyona.msg("You are currently offline",true,"danger bold");}//@doto: connection
            else{service.militia(that.basilia,function(j){
               if(j.notitia)iyona.log(j.notitia.sql);
               if(j.notitia&&j.notitia.idem!=0){var u=dynamis.get("USER_NAME",true);u.cons=j.notitia.idem;dynamis.set("USER_NAME",u)}//pour maitre un autre biscuit
               iyona.log(j,'Online');if(typeof callback=="function")callback(j);});}
         }//endif PASCO
      }//endif online
   }
   //=========================================================================//
}
//############################################################################//
//FETCH                                                                       //
//############################################################################//
function fetch($http){
   this.responseType=this.responseType||"json";
   if(!dynamis.get("CONFIG").isOnline){iyona.msg("Your device is currently Offline.",true,"danger bold"); return false;}//@todo
   this.post=function(url,params,callback){
      $http.post(url,$.param(params),{"responseType":this.responseType,"cache":true,"headers":{"Content-Type":"application/x-www-form-urlencoded"},"withCredentials":true}).success(callback)
//      $http({"url":url,"params":params,"method":"POST","responseType":this.responseType,"cache":true,"headers":{"Content-Type":"application/x-www-form-urlencoded"},"withCredentials":true}).success(callback)
      .error(function(data,status,headers,config){
         if(status==404&&PASCO&&navigator.connection.type=="none") iyona.msg("Please check your internet connection::"+navigator.connection.type,true,'danger bold');
         if(status==404&&PASCO) iyona.msg("Please check your internet connection::"+navigator.connection.type,true,'danger bold');
         iyona.log("There was an error in handling the transaction.");
         if(data&&"err" in data)iyona.msg(data.err,true,"danger",true);
         iyona.deb(data,status,headers,config,config.url);
      });
   }
}
//############################################################################//
//CRUD                                                                        //
//############################################################################//
function crud(notitia,$routeParams){
   var that=this;
   this.get=function($scope,scope,keyName,mensa,conseutudinem){var view=$routeParams.view||'details',details=$routeParams.opt||'';
//      this.scope=_$('[ng-controller="'+controller+'"]').scope();
      this.scope=$scope;this.keyName=keyName;iyona.deb($scope,'$scope2');
      that.scope.data={};
      if(details!=='new'&&details!=='view'){notitia.firstKings(mensa,scope.details,3,this.details,conseutudinem)}
      else if(view=='all'){notitia.firstKings(mensa,scope.list,3,this.list);}
      return view;
   };
   this.details=function(server){
      if("notitia" in server&&angular.isArray(server.notitia.iota)){angular.extend(that.scope.data,server.notitia.iota[0]);iyona.msg(server.notitia.msg);
         if("consuetudinem" in server.notitia){that.scope.opt.reference=server.notitia.consuetudinem.links;}
         that.scope.btn="Update "+that.keyName;that.scope.$broadcast("readyForm",server.notitia);
      }else{var msg=("notitia" in server)?server.notitia.err:null; iyona.msg(msg||"There was an error fetching the selected record",true,"danger");}
   };
   this.list=function(server){
      if("notitia" in server&&"err" in server.notitia){iyona.msg(server.notitia.err,true,'danger',true);
      }else if("notitia" in server){that.scope.data=server.notitia.iota;that.scope.$broadcast("readyList",server.notitia);iyona.msg(server.notitia.msg,true,"danger");iyona.deb(server.notitia.iota,"List");
      }else{iyona.msg("There was an error fetching the selected record",true,"danger",true);}
   };
   this.submit=function($scope,mensa,conseutudinem){
      var tau=$scope.data.jesua?"deLta":"Alpha";
      if(tau=="deLta"){delete $scope.data.created;}//upon update do not change the creation date.
      try{
         notitia.firstKings(mensa,$scope.data,tau,function(server){if("notitia" in server===false){iyona.msg(server.notitia.err||"There was an error from the server",server);return false;}
            var notitia=server.notitia,consuetudinem=notitia.consuetudinem,err="err" in notitia?true:false,clss=err?"danger bold":"success";
            if(tau=="Alpha"&&err)$scope.data.jesua=null;//if there is an error when adding data reset the form jesua
            if(consuetudinem.links){$scope.opt.reference=consuetudinem.links;} //do not overflow the update
//            $scope.btnClass=err?"form-control btn btn-danger":"form-control btn btn-success";//somehow this is not working
            var tmp=$scope.btn;$scope.btn=notitia.msg;setTimeout(function(){$scope.btn=tmp;$scope.$apply();},2000);
            iyona.msg(notitia.msg,false,clss);
         },conseutudinem);
      }catch(e){iyona.msg("There was an internal error. return to the previous page and try again."); iyona.log("Internal error::"+e.message,e);if(tau=="Alpha");$scope.data.jesua=null;}
   }
   this.delete=function($scope,mensa){
      var msg="Would you like to remove the current record?";
      if(!$scope.data.jesua){iyona.msg("You need to add a new record first.",false,"danger bold"); return false;}
      if (PASCO){navigator.notification.confirm(msg,function(buttonIndex){
            if(buttonIndex==1){this.remove($scope,mensa);}
         },"Remove Server",["Yes","No"]);
      }else if(confirm(msg)){this.remove($scope,mensa);};
   }
   this.remove=function($scope,mensa){
      var tau="omegA";
      notitia.firstKings(mensa,$scope.data,tau,function(server){
         if(!server.notitia) {iyona.log("There was an error retrieving notitia"); return false};
         if("err" in server.notitia) {iyona.log(server.notitia.err,true,'danger',true); return false};
         var notitia=server.notitia,err="err" in notitia?true:false,clss=err?"danger bold":"success";
         var scope=dynamis.get("scope")[$routeParams.page];$scope.data=scope;$scope.opt.reference=null;//empty scope
         if(notitia.consuetudinem&&notitia.consuetudinem.servers&&notitia.consuetudinem.servers.length>0){}
         iyona.msg(notitia.msg,true,clss);
      });
   }
   this.DBenum=function(links,parent,col1,key,type){
      links=("rows" in links)?links.rows:links;var x,l=links.length;
      if(type=="radio"){
         for (x=0;x<l;x++){links[x][col1]=null;}//reset all options on click
         links[key][col1]=parent;
      }else{iyona.deb(links[key][col1],'links[key][col1]');
         links[key][col1]=(links[key][col1])?null:parent;
      }//endif
      return links;
   }//enum
   this.DBset=function(field,val){iyona.deb(field,"start",val);
      var reg = new RegExp(',?'+val,"g");
      if(field.indexOf(val)!=-1){field=field.replace(reg,'');iyona.deb(field,"first");}
      else if (!field) {field=val;iyona.deb(field,"second");}
      else {field+=','+val;iyona.deb(field,"third");}
      return field;
   }
   this.rem=function(){}
}
//############################################################################//
//CRUD                                                                        //
//############################################################################//