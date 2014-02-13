/*
 * notitia object for creating connection to the local db
 * @uses jquery|lib.muneris
 */

/******************************************************************************/
/* @author fredtma
 * @version 3.2
 * @category dynamic, menu, object, databse
 * @param array $__theValue is the variable taken in to clean <var>$__theValue</var>
 * @return object
 * @todo: add a level three menu step
 * @see: placeObj
 */
function SET_DB(_reset){
   var that=this,eternal=eternalCall();
   if(dynamis.get("CONFIG").openDatabase===false)return false;
   if(eternal){that.name=eternal.form.field.name;that.frmName='frm_'+that.name;that.frmID='#frm_'+that.name;}
   that.reset=_reset||false;
   that.patterns=dynamis.get("EXEMPLAR");
   //=========================================================================//SET DB AND VERSION
   that.db=window.openDatabase(sessionStorage.DB_NAME,'',sessionStorage.DB_DESC,sessionStorage.DB_SIZE*1024*1024,function(){iyona.log('create a new DB')});
   if(that.db.version!=sessionStorage.DB_VERSION&&!$("footer").data("db version")){
      iyona.log("Changing version.");
      that.version={};that.version.ver=sessionStorage.DB_VERSION;
      that.version.revision={"users":1};
      that.db.changeVersion(
         that.db.version,sessionStorage.DB_VERSION,
         function(trans){if(dynamis.get("CONFIG").Online)version_db(that.db.version,that.version,trans)},
         function(e){iyona.log(e.message)},
         function(e){iyona.log('PASSED');});
         dynamis.set("DB",JSON.stringify(that.db),true);$("footer").data("db version",1);
   }
   //=========================================================================//
   this.agito=function(_quaerere,_params,_msg,_callback,_reading){
      var params=_params||[];
      var Tau=false,res,mensa;/*used in quaerere*/
      if(_reading)that.db.transaction=that.db.readTransaction();
      that.db.transaction(function(trans){
         trans.executeSql(_quaerere,params,function(trans,results){
            if(_msg)iyona.log('Success DB transaction: '+_msg);console.log('%c'+_quaerere,'background:#222;color:#48b72a;width:100%;font-weight:bold;',params);
            var rows=that.db2json(results);
            if(_msg)notice("Successful: "+_msg);
            //================================================================//ONLINE
            if(sessionStorage.quaerere&&dynamis.get("CONFIG").Online){
               var q=JSON.parse(sessionStorage.quaerere),procus=impetroUser(),moli=screen.height*screen.width;
               res=q.eternal;Tau=q.Tau;mensa=q.iyona;
               that.basilia={"eternal":res,"Tau":Tau,"mensa":mensa,"procus":procus.singularis,"moli":moli};
               get_ajax(sessionStorage.SITE_MILITIA,that.basilia,'','post','json',function(j){iyona.log(j,'Online');});
               sessionStorage.removeItem('quaerere');Tau=false;
            }
            if(_callback)_callback(results,rows);
         },function(_trans,_error){
            if(_msg.search('no such table')!=-1){
               dynamis.del('DB',true);//@todo:fix this,ensure u give proper notification and create only missing
               $('#userLogin .alert-info').removeClass('alert-info').addClass('alert-error').find('span').html('The application yet to be installed on this machine.<br/> We will run the installation on the next refresh')
            }
            iyona.log('Failed DB: '+_msg+':'+_error.message);
            console.log('%c ::QUAERERE='+_quaerere, 'background:#222;color:#ff0000;font-weight:bold;');
            notice("<div class='text-error'>"+_error.message+'</div>');
         });
      });
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
         $.each(eternal.fields,function(field,properties){
            if(properties.field.type=='editor'&&(_actum==2||_actum==1)){val=CKEDITOR.instances[field].getData();}
            else val=$(form+' #'+field).val()||$(form+' [name^='+field+']:checked').val()||$(form+' .active[name^='+field+']').val()||properties.field.value;//field,check,active,default
            alpha=alpha||val;//la premiere donner pour cree une donner pour jesua
            if(_actum!=3&&typeof _actum!=="undefined"&&val){
               if(that.sanatio(val,field,properties,_actum)===false){quaerere=[];return false;}
               if(properties.field.type=='password'){val=md5($(form+' #'+field).val())}
               if(properties.source!='custom'){params.push(val);res[field]=val;set.push("?");quaerere.push('`'+field+'`');}
            } else if(properties.source!='custom') {
               quaerere.push('`'+field+'`');
            }
         });
         if(quaerere.length==0)return false;//pas de donner trouver, surment une erreur de value
      }//endif_actum!=0
      sessionStorage.quaerere['eternal']=JSON.stringify(res);
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
            $('footer').data('jesua',alpha);//@see: insert it replacesinsertId
            Tau='Alpha';res['blossom']['alpha']=alpha;res['creation']=modified;
            actum='INSERT INTO '+mensa+' ('+quaerere.join()+')VALUES('+set.join()+')';
            msg='record added to '+mensa;break;
         case 2:
            val=$(form+' #name').val()||$(form+' #username').val();//get the reference field
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
      $.each(fields,function(key,property){
         key2=key.replace(/\s/ig,'');//removes spaces
         if(_reference) type=property.type||eternal.children[_reference].global.type;
         else type=(property.field&&property.field.type)?property.field.type:(property.complex)?property.complex:'';
         if(_head && !property.header) return true;
         switch(type){
            case 'radio':
            case 'bool':
            case 'check':
               if(_from==='form')$(frmID+' [name^='+key2+']').each(function(){if($(this).val()==_source[key]||$(this).text()==_source[key])$(this).addClass('active').prop('checked',true);else $(this).removeClass('active').prop('checked',false);});
               else if(_from==='list')$(frmID+' [name^='+key2+']').each(function(){if($(this).prop('checked')||$(this).hasClass('active'))_return[c]=$(this).addClass('active').prop('value');});
               else _return[c]=_source[key2];
               break;
            case 'p':
            case 'span':
               if(_from==='form'&&_source[key])$(frmID+' #'+key2).html(_source[key]);
               else _return[c]=_source[key];
               break;
            case 'password':$(frmID+' #'+key2).prop("required",false);$(frmID+' #signum').prop("required",false);break;
            default:
               if(_from==='form'&&_source[key]){$(frmID+' #'+key2).val(_source[key]);if(key2=='password'&&document.getElementById('signum'))document.getElementById('signum').value=_source[key]}
               else if(_from==='list')_return[c]=$(frmID+' #'+key2).val();
               else _return[c]=_source[key2];
               break;
         }//endswitch
         c++;
      });
      return _return;
   }
   //=========================================================================//
   this.resetDB=function(_option){
      var quaerere='',ref,l,x,indexes=[],references=[],names=[];
      var defaults={"id":{"type":"INTEGER","key":true},"jesua":{"type":"TEXT","unique":true},"created":{"type":"TEXT"},"modified":{"type":"TIMESTAMP","default":"CURRENT_TIMESTAMP"}};
      var option={"users":0,"contacts":0,"version_db":0};
      if(angular.isString(_option)&&option.hasOwnProperty(_option))option[_option]=true; else if (_option===true)option=true; else if(angular.isObject(_option))option=_option;
      var database={
         "users":{"defaults":defaults,fields:{"username":{"type":"TEXT","unique":true},"firstname":{"type":"TEXT","null":true},"lastname":{"type":"TEXT"},"password":{"type":"TEXT","null":true}}},
         "contacts":{"defaults":defaults,fields:{"ref_user":{"type":"TEXT","null":true,"ref":{"table":"users","field":"jesua"}},"type":{"type":"TEXT","null":true},"contact":{"type":"TEXT","null":true,"ndx":"ndxContact"},"instruction":{"type":"TEXT"},"ext":{"type":"TEXT"}}},
         "version_db":{fields:{"id":{"type":"INTEGER","key":true},"id":{"type":"REAL"}}}
      }
      for (var table in database){ iyona.deb(table,database,database[table],'table');
         if(option[table]||option===true){
            var mensa=database[table];
            that.agito("DROP TABLE "+table,[],"DROP table "+table);
            if(mensa.defaults)angular.extend(mensa.fields,mensa.defaults);
            for(var field in mensa.fields){
               var current=mensa.fields[field];
               quaerere+="`"+field+"` "+current.type;names.push(field);
               if(current.key)quaerere+=" PRIMARY KEY AUTOINCREMENT";
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
            l=indexes.length;for(x=0;x<l;x++){that.agito(indexes[x],[],"Index created")}
            that.novaNotitia(table,"get"+table,names);
         }//if table
      }//for database
   }
   //=========================================================================//
   this.novaNotitia=function(_mensa,_comand,_fields){
      var fields='',values=[],sql;var x,l,f=[],n=[];
      $http({url:dynamis.get("SITE_SERVICE"),data:{militia:_comand},method:"POST",responseType:'json'}).success(function(json,status,headers,config){
         l=_fields.length;iyona.deb(json);
         for(x=0;x<l;x++){f.push('?');n.push('`'+_fields[x]+'`');}
         $.each(json,function(i,v){
            if(i==='rows')return true;
            l=_fields.length;
            for(x=0;x<l;x++){values.push(v[_fields[x]]);}
            if(_comand=="getUsers")v.gender=v.gender=='Male'?'1':'2';
            fields+=fields==''?"SELECT "+f.join():" UNION SELECT "+f.join();
         });
         sql="INSERT INTO "+_mensa+" ("+n.join()+") "+fields;
         that.agito(sql,values,"added "+_mensa);
      }).error(function(jqxhr,textStatus,error){var err=textStatus+','+error;console.log('failed to get json:'+err)});
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
     var jesua=$element(_set).parents('tr').data('jesua');
     var name=eternal.form.field.name;
     var valor=$element(_set).text();
     var t = new Date().format('isoDateTime');//var jesua=md5(valor+t);
     var delta='UPDATE `'+eternal.mensa+'` SET `'+agrum+'`=?,modified=? WHERE jesua=?';var msg='  Updated field '+agrum;
     var quaerere={};quaerere.eternal={'blossom':{"alpha":jesua,"delta":"!@=!#"},"modified":t};quaerere.eternal[agrum]=valor;
     quaerere.Tau='deLta';quaerere.iyona=eternal.mensa;sessionStorage.quaerere=JSON.stringify(quaerere);
     this.agito(delta,[valor,t,jesua],msg,function(){
        $element('.table-msg-'+name).html(msg).animate({opacity:0},200,"linear",function(){$element(this).animate({opacity:1},200);});
     });
  }
  /******************************************************************************/
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
        $element(_tr).data('jesua',iota);
        $element('.table-msg-'+name).html(msg).animate({opacity:0},200,"linear",function(){$element(this).animate({opacity:1},200);});
     });
     return true;
  }
  /******************************************************************************/
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
     var jesua=$element(_set).parents('tr').data('jesua');
     $element(_set).parents('tr').hide();var msg = " Record removed ";
     var quaerere={"eternal":{"blossom":{"alpha":jesua,"delta":"!@=!#"}},"iyona":eternal.mensa,"Tau":"oMegA"};sessionStorage.quaerere=JSON.stringify(quaerere);
     this.agito("DELETE FROM "+eternal.mensa+" WHERE jesua=?",[jesua],msg,function(){
        $element('.table-msg-'+name).html(msg).animate({opacity:0},200,"linear",function(){$element(this).animate({opacity:1},200);});
     });
  };
   //=========================================================================//
   if(!dynamis.get("DB",true)){
      dynamis.set("DB",JSON.stringify(that.db),true);
//      callWorker({"novaNotitia":true});
      this.resetDB(true);
   }
   if(this.reset)
   //callWorker({"novaNotitia":true});
   this.resetDB(this.reset);
   //=========================================================================//
}