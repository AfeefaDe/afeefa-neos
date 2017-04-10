qx.Class.define("FormView", {

    extend: View,
    type: "singleton",

    properties: {
        baseUrl: {},
        formTypes: {},
        currentForm: {},
        // currentFormType: {init: null},
        // entryTypeEnum: {},
        // properties: {},
        // html5InputTypes: {}
    },

    construct: function () {
        var that = this;

        that.setViewId('formView');

        that.setLoadable(true);

        that.setBaseUrl('_Resources/Static/Packages/DDFA.dresdenfueralleDe/DDFA/inc/');

        // that.setEntryTypeEnum(
        //     {
        //         initiative: 0,
        //         marketentry: 1,
        //         event: 2
        //     }
        // );

        that.setFormTypes({
            feedback: {
                name: 'feedback',
                templateFile: 'form_feedback.html',
                sendMethod: that.createFeedback
            },
            contact: {
                name: 'contact',
                templateFile: 'form_contact.html',
                sendMethod: that.createContact
            },
            newEntry: {
                name: 'newEntry',
                templateFile: 'form_newEntry.html',
                sendMethod: that.createEntry
            }
        });

        // var mainCategories = _.filter(APP.getData().categories, function (value, key) {
        //     return value.type == 1;
        // });

        // that.setProperties(
        //     {
        //         initiative: {
        //             name: {name: 'name', type: 'text', intoOwner: true},
        //             category: {name: 'category', type: 'select', values: mainCategories, intoOwner: true},
        //             // subCategory: {name: 'subCategory', type: 'select', values: APP.getConfig().categories[0].sub, intoOwner: true },
        //             speakerPublic: {name: 'speakerPublic', type: 'text', intoOwner: true},
        //             mail: {name: 'mail', type: 'email', required: true, intoOwner: true},
        //             web: {name: 'web', type: 'url', intoOwner: true},
        //             facebook: {name: 'facebook', type: 'url', intoOwner: true},
        //             description: {name: 'description', type: 'textarea', required: true, intoOwner: true},
        //             forChildren: {name: 'forChildren', type: 'checkbox', intoOwner: true},
        //             supportWanted: {name: 'supportWanted', type: 'checkbox', intoOwner: true},
        //             phone: {name: 'phone', type: 'tel', intoOwner: true},
        //             spokenLanguages: {
        //                 name: 'spokenLanguages',
        //                 type: 'multiselect',
        //                 values: APP.getConfig().languages,
        //                 intoOwner: true
        //             },
        //             placename: {name: 'placename', type: 'text', intoLocation: true},
        //             street: {name: 'street', type: 'text', intoLocation: true},
        //             zip: {name: 'zip', type: 'text', intoLocation: true},
        //             city: {name: 'city', type: 'text', intoLocation: true}
        //         },
        //         marketentry: {
        //             offer: {
        //                 name: 'offer',
        //                 type: 'switch',
        //                 intoOwner: true,
        //                 values: [[true, 'offer'], [false, 'request']]
        //             },
        //             name: {name: 'name', type: 'text', intoOwner: true},
        //             category: {name: 'category', type: 'select', values: mainCategories, intoOwner: true},
        //             // subCategory: {name: 'subCategory', type: 'select', values: APP.getConfig().categories[0].sub, intoOwner: true },
        //             speakerPublic: {name: 'speakerPublic', type: 'text', intoOwner: true},
        //             mail: {name: 'mail', type: 'email', required: true, intoOwner: true},
        //             web: {name: 'web', type: 'url', intoOwner: true},
        //             facebook: {name: 'facebook', type: 'url', intoOwner: true},
        //             description: {name: 'description', type: 'textarea', required: true, intoOwner: true},
        //             forChildren: {name: 'forChildren', type: 'checkbox', intoOwner: true},
        //             supportWanted: {name: 'supportWanted', type: 'checkbox', intoOwner: true},
        //             phone: {name: 'phone', type: 'tel', intoOwner: true},
        //             spokenLanguages: {
        //                 name: 'spokenLanguages',
        //                 type: 'multiselect',
        //                 values: APP.getConfig().languages,
        //                 intoOwner: true
        //             },
        //             placename: {name: 'placename', type: 'text', intoLocation: true},
        //             street: {name: 'street', type: 'text', intoLocation: true},
        //             zip: {name: 'zip', type: 'text', intoLocation: true},
        //             city: {name: 'city', type: 'text', intoLocation: true},
        //             dateFrom: {name: 'dateFrom', type: 'date', intoOwner: true},
        //             dateTo: {name: 'dateTo', type: 'date', intoOwner: true},
        //             timeFrom: {name: 'timeFrom', type: 'time', intoOwner: true},
        //             timeTo: {name: 'timeTo', type: 'time', intoOwner: true}
        //         },
        //         event: {
        //             name: {name: 'name', type: 'text', intoOwner: true},
        //             category: {name: 'category', type: 'select', values: mainCategories, intoOwner: true},
        //             // subCategory: {name: 'subCategory', type: 'select', values: APP.getConfig().categories[0].sub, intoOwner: true },
        //             speakerPublic: {name: 'speakerPublic', type: 'text', intoOwner: true},
        //             mail: {name: 'mail', type: 'email', required: true, intoOwner: true},
        //             web: {name: 'web', type: 'url', intoOwner: true},
        //             facebook: {name: 'facebook', type: 'url', intoOwner: true},
        //             description: {name: 'description', type: 'textarea', required: true, intoOwner: true},
        //             forChildren: {name: 'forChildren', type: 'checkbox', intoOwner: true},
        //             supportWanted: {name: 'supportWanted', type: 'checkbox', intoOwner: true},
        //             phone: {name: 'phone', type: 'tel', intoOwner: true},
        //             spokenLanguages: {
        //                 name: 'spokenLanguages',
        //                 type: 'multiselect',
        //                 values: APP.getConfig().languages,
        //                 intoOwner: true
        //             },
        //             placename: {name: 'placename', type: 'text', intoLocation: true},
        //             street: {name: 'street', type: 'text', intoLocation: true},
        //             zip: {name: 'zip', type: 'text', intoLocation: true},
        //             city: {name: 'city', type: 'text', intoLocation: true},
        //             dateFrom: {name: 'dateFrom', type: 'date', intoOwner: true},
        //             dateTo: {name: 'dateTo', type: 'date', intoOwner: true},
        //             timeFrom: {name: 'timeFrom', type: 'time', intoOwner: true},
        //             timeTo: {name: 'timeTo', type: 'time', intoOwner: true}
        //         }
        //     }
        // );

        // that.setHtml5InputTypes(['text', 'number', 'range', 'url', 'email', 'tel', 'date', 'month', 'week', 'time', 'datetime', 'datetime-local']);
    },

    members: {

        render: function () {
            var that = this;

            // view container
            that.view = $("<div />");
            that.view.attr('id', that.getViewId());

            $('#main-container').append(that.view);

            // heading
            var headingContainer = $("<div />").addClass('heading');
            that.heading = $("<h1 />");
            headingContainer.append(that.heading);
            that.view.append(headingContainer);

            // back button
            that.createBackBtn(function(){that.close();});

            // form container
            that.scrollContainer = $("<div />")
                .addClass('scroll-container');
            if (APP.getUserDevice() == 'desktop') that.scrollContainer.perfectScrollbar();
            that.view.append(that.scrollContainer);

            this.base(arguments);
        },

        load: function (type, options) {
            var that = this;

            // load form from html and insert
            that.scrollContainer.load(that.getBaseUrl() + that.getFormTypes()[type].templateFile, function( response, status, xhr ){
                if(status == "error" ){}

                // fill mustaches with values
                var filledHtml = that.fillMustaches(that.scrollContainer.html(), (options && options.mustaches)? options.mustaches : null);
                that.scrollContainer.html(filledHtml);

                // init character counters
                that.view.find('input, textarea').each(function(i, el){
                    $(el).characterCounter();
                });

                // init select dropdowns
                that.view.find('select').each(function(i, el){
                    // $(el).material_select();
                    // $(el).addClass('hidden');
                });

                that.parseForm(type, options);
                that.loadUIVocab(type);
            });


            that.view.addClass('active');
// --------------------------------------------------------------------------------------
            return;
// --------------------------------------------------------------------------------------

            // that.reset();

            // // activate loaded form type
            // that.setCurrentFormType(type);
            // that.forms[type].form.addClass('active');

            // // set placeholders/ labels
            // _.each(that.getProperties()[type], function (property) {
            //     // set placeholder value
            //     that.forms[type].fields[property.name]
            //         .attr('placeholder', that.getWording('form.placeholder.' + property.name));

            //     // set label value if a lable exists
            //     if (that.forms[type].fields[property.name + '_label'])
            //         that.forms[type].fields[property.name + '_label']
            //             .empty()
            //             .append(that.getWording('form.placeholder.' + property.name));

            //     if (_.contains(['date', 'time'], property.type)) {
            //         if (APP.getUserDevice() == 'desktop' && !Modernizr.inputtypes.date) {
            //             that.forms[type].fields[property.name].hide();
            //             // that.forms[type].fields[property.name].combodate({
            //             //  minYear: 2016,
            //             //    maxYear: 2017,
            //             //    minuteStep: 10
            //             // });
            //         }
            //     }
            //     // options in select + multiselect inputs
            //     else if (property.type == 'select') {
            //         // remove all options
            //         that.forms[type].fields[property.name].empty();

            //         // add empty option
            //         var emptyOption = $('<option />')
            //         // .attr('selected', true)
            //             .attr('value', '')
            //             .append(that.getWording('form.emptyOption.' + property.name));
            //         that.forms[type].fields[property.name].append(emptyOption);

            //         _.each(property.values, function (value, key) {

            //             var option = $("<option />");

            //             if (property.name == 'category') {
            //                 option
            //                     .attr('value', value.identifier)
            //                     .append(that.getWording('cat.' + value.name));
            //             }
            //             else if (property.name == 'subCategory') {
            //                 option
            //                     .attr('value', value.name)
            //                     .append(that.getWording('cat.' + value.name));
            //             }
            //             else {
            //                 option
            //                     .attr('value', value[0])
            //                     .append(that.getWording('prop.' + property.name + '_' + value[1]));
            //             }

            //             that.forms[type].fields[property.name].append(option);
            //         });
            //     }
            //     else if (property.type == 'multiselect') {

            //         // remove all options
            //         that.forms[type].fields[property.name].empty();

            //         // placeholder for desktop (using "chosen" jQ plugin)
            //         that.forms[type].fields[property.name]
            //             .attr('data-placeholder', that.getWording('form.placeholder.' + property.name));

            //         // TODO not working, because mobile browsers show "N selected" instead of placeholder or first option
            //         // placeholder for mobiles (using empty option, because placeholder is not natively supported for multi select)
            //         // if( APP.getUserDevice() != 'desktop' ){
            //         //  var emptyOption = $('<option />')
            //         //      .attr('value', '')
            //         //      .append(that.getWording('form_placeholder_' + property.name));
            //         //  that.forms[type].fields[property.name].append(emptyOption);
            //         // }

            //         _.each(property.values, function (value) {

            //             var option = $("<option />");

            //             option.attr('value', value);
            //             option.append(that.getWording('lan.' + value));

            //             that.forms[type].fields[property.name].append(option);
            //         });

            //         if (APP.getUserDevice() == 'desktop')
            //             that.forms[type].fields[property.name].chosen();
            //     }
            // });

            // that.view.addClass('active');
        },

        loadUIVocab: function(type){
            var that = this;

            that.heading.empty().append(that.getWording('form.heading.' + type));

            // that.view.find('label, option').each(function(i, el){
            //     var key = $(el).html().split(':')[1];
            //     console.debug(key);
            //     $(el).html(that.getWording(key));
            // });
        },

        parseForm: function(type, options){
            var that = this;

            var form = {
                formType: null,
                formEl: null,
                submitEl: null,
                fields: {}
            };

            // form type
            form.formType = that.getFormTypes()[type];

            // the form
            form.formEl = that.view.find('form').first();

            form.formEl.submit(function (e) {
                e.preventDefault();
                that.send(options);
            });

            // the fields
            that.view.find('input, textarea, select').each(function(i, el){
                var $el = $(el);
                form.fields[$el.attr('id')] = {
                    modelAttr: $el.attr('id'),
                    el: $el
                }
            });

            // the cancel button
            that.view.find('a#cancel').first().click(function(){
                that.close();
            });
            
            that.setCurrentForm(form);
        },

        readForm: function(){
            var that = this;

            var formData = {};
            
            // extract all model names
            var attributes = [];
            _.each(that.getCurrentForm().fields, function(value, key){
                attributes.push(value.modelAttr.split('.')[0]);
            });
            
            _.each(_.unique(attributes), function(element){
                formData[element] = {};    
            });

            // extract attribute values and combine
            _.each(that.getCurrentForm().fields, function(value, key){
                var realValue;

                if( value.el.attr('type') == 'checkbox' ){
                    realValue = value.el[0].checked;
                }
                else {
                    realValue = value.el.val();
                }
                formData[value.modelAttr.split('.')[0]][value.modelAttr.split('.')[1]] = realValue;
            });

            return formData;
        },

        send: function (options) {
            var that = this;

            // that.loading(true);

            var data = that.readForm();
            console.debug(data);

            that.getCurrentForm().formType.sendMethod(data, options, function(){
                that.createModal({
                    content: $('<h5>Nachricht wurde erfolgreich verschickt.</5>'),
                    dismissible: true,
                    buttonLabel: "Schön",
                    actions: {
                        ready: function(){},
                        close: function(){ that.close(); }
                    }
                });
            });

            // var type = that.getCurrentFormType();

            // create marketentry record + location record
            // if (type == 'initiative' || type == 'marketentry' || type == 'event') {
            //     var dataMarketEntry = {"marketentry": {}};
            //     var dataLocation = {"location": {}};

            //     // cycle through form fields and extract data
            //     _.each(that.getProperties()[type], function (property) {
            //         // read value from form element
            //         var value = that.forms[type].fields[property.name].val();

            //         // set to null where meant to be null
            //         if (value === '') value = null;

            //         // may handle special types
            //         // if( value && (property.type == 'datetime' || property.type == 'datetime-local') ){
            //         //  // convert to sql datetime
            //         //  var d = new Date( value );
            //         //  // value = d.toISOString().slice(0, 19).replace('T', ' ');
            //         //  value = d.toISOString().slice(0, 19) + '+0200';
            //         // }
            //         if (property.type == 'checkbox' || property.type == 'switch') {
            //             value = that.forms[type].fields[property.name].prop('checked');
            //         }
            //         else if (property.type == 'multiselect' && value) {
            //             value = value.join(",");
            //         }

            //         if (property.intoOwner) dataMarketEntry.marketentry[property.name] = value;
            //         if (property.intoLocation) dataLocation.location[property.name] = value;
            //     });

            //     dataMarketEntry.marketentry.type = that.getEntryTypeEnum()[type];
            //     dataMarketEntry.marketentry.published = false;

            //     // dataLocation.location.type = that.getEntryTypeEnum()[type];
            //     // dataLocation.location.published = false;

            //     that.createMarketEntryAndLocation(dataMarketEntry, dataLocation);
            // }
        },

        createEntry: function (data, options, cb) {
            var that = this;

            // to backend
            data.entry.area = "dresden";

            var data_converted = {
                marketentry: data.entry,
                location: data.location
            };

            APP.getDataManager().addMarketEntry(data_converted, function (response) {
                if (!response.marketentry) {
                    // that.thatResponseMessage().append( that.getWording('form_fail') );
                    alert(that.getWording('form.fail'));
                    that.loading(false);
                    return;
                }

                // that.responseMessage.append( that.getWording('form_success') );
                alert(that.getWording('form.success'));
                that.close();

                // dataLocation.location['marketEntry'] = response.marketentry.persistenceObjectIdentifier;
                // APP.getDataManager().addLocation(dataLocation, function(){
                //  // alert('marketLocation sent, thanks');
                // });
            });

            // to github
            APP.getDataManager().createGithubIssue({
                data: {
                    type: 'entry',
                    entryType: data.entry.type,
                    entryData: data.entry,
                    locationData: data.location
                }
            });
            
            // send outgoing message
            var entryTypes = {0: 'Orga', 1: 'Börse', 2: 'Event'};

            // to slack
            APP.getDataManager().createSlackMessage({
                heading: function () {
                    var entryTypeString = entryTypes[data.entry.type];
                    var marketTypeString = (data.entry.offer) ? 'Angebot' : 'Gesuch';
                    if (data.entry.type == 1) entryTypeString += ' (' + marketTypeString + ')'
                    return 'Neuer Eintrag: ' + entryTypeString + ' "' + data.entry.name + '"'
                }(),
                message: '```\n' + data.entry.description + '\n```\n'
                + 'für Kinder: `' + (data.entry.forChildren ? 'ja' : 'nicht explizit') + '`\n'
                + 'Unterstützer gesucht: `' + (data.entry.supportWanted ? 'ja' : 'nein') + '`\n'
                + 'Kontaktperson: `' + data.entry.speakerPublic + '`\n'
                + 'Sprachen: `' + data.entry.spokenLanguages + '`\n'
                + 'mail: `' + data.entry.mail + '` '
                + 'web: `' + data.entry.web + '` '
                + 'facebook: `' + data.entry.facebook + '` '
                + 'phone: `' + data.entry.phone + '`\n'
                + 'Ort: `' + data.location.placename + ', ' + data.location.street + ', ' + data.location.zip + ' ' + data.location.city + '`\n'
                + 'von: `' + data.entry.dateFrom + ' (' + data.entry.timeFrom + ')' + '`\n'
                + 'bis: `' + data.entry.dateTo + ' (' + data.entry.timeTo + ')' + '`\n\n'
            });

            cb();
        },

        createFeedback: function (data, options, cb) {
            var that = this;

            // to github
            // TODO read response to get created issue ID and post this ID as waffle link to slack
            APP.getDataManager().createGithubIssue({
                data: {
                    type: 'feedback',
                    feedbackData: data.feedback,
                    metaData: JSON.stringify(L.Browser)
                }
            });

            // to slack
            APP.getDataManager().createSlackMessage({
                heading: 'Feedback von _' + data.feedback.author + '_ (' + data.feedback.mail + ')',
                message: '```\n' + data.feedback.message + '\n```'
            });

            // send mail to team inbox
            APP.getDataManager().sendMail({
                data: {
                    mail_fromMail: 'bot@afeefa.de',
                    mail_fromName: data.feedback.author,
                    mail_to: 'team@afeefa.de',
                    mail_replyTo: data.feedback.mail,
                    mail_subject: '[Feedback] ' + data.feedback.author,
                    mail_bodyPlain: data.feedback.message,
                    mail_bodyHtml: function () {
                        return '<p><i>' + data.feedback.message + '</i></p>';
                    }
                }
            });

            cb();
        },

        createContact: function (data, options, cb) {
            var that = this;

            console.debug(options);

            // to slack
            APP.getDataManager().createSlackMessage({
                heading: 'Kontaktanfrage von _' + data.contact.author + ' (' + data.contact.mail + ')_ an _' + options.entry.name + ' (' + options.entry.mail + ')_',
                message: '```\n' + data.contact.message + '\n```'
            });

            // send mail to entry's email
            APP.getDataManager().sendMail({
                data: {
                    mail_fromMail: 'bot@afeefa.de',
                    mail_fromName: data.contact.author + ' über Afeefa.de',
                    mail_to: options.entry.mail,
                    mail_replyTo: data.contact.mail,
                    mail_subject: 'Anfrage von ' + data.contact.author,
                    mail_bodyPlain: data.contact.message,
                    mail_bodyHtml: function () {
                        return '<p><i>' + data.contact.message + '</i></p>'
                            + '<p>' + data.contact.author + ' | ' + data.contact.mail + ' | ' + data.contact.phone + '</p>'
                            + '<hr><small>Nachricht gesendet über <a href="https://afeefa.de">Afeefa.de</a></small>';
                    }
                }
            });

            cb();
        },

        // createLocationButton: function (locationContainer) {
        //     var that = this;

        //     var btn = $('<button />')
        //         .append(that.getWording('form.locationBtn.add'))
        //         .click(function (e) {
        //             e.preventDefault();

        //             // show addition input fields
        //             locationContainer.toggleClass('active');

        //             // change button
        //             if (locationContainer.hasClass('active')) {
        //                 $(this).empty().append(that.getWording('form.locationBtn.remove'));
        //             }
        //             else {
        //                 $(this).empty().append(that.getWording('form.locationBtn.add'));
        //                 // empty additional input fields
        //                 locationContainer.find('input').val('');
        //             }
        //         });

        //     return btn;
        // },

        addEvents: function () {
            var that = this;

            // call superclass
            this.base(arguments);
        },

        reset: function () {
            var that = this;

            // that.setCurrentFormType(null);

            that.scrollContainer.empty();

            that.loading(false);
        },

        close: function () {
            var that = this;

            that.reset();
            that.view.removeClass('active');
        },

        changeLanguage: function () {
            var that = this;

            if (that.getCurrentForm()) that.load( that.getCurrentForm().formType.name );
        },

        createMarketEntryAndLocation: function (dataMarketEntry, dataLocation) {
            var that = this;

            //todo: adapt, if more areas are added
            dataMarketEntry.marketentry.area = "dresden";
            var data_joined = _.extend(dataMarketEntry, dataLocation);

            APP.getDataManager().addMarketEntry(data_joined, function (response) {
                if (!response.marketentry) {
                    // that.thatResponseMessage().append( that.getWording('form_fail') );
                    alert(that.getWording('form.fail'));
                    that.loading(false);
                    return;
                }

                // that.responseMessage.append( that.getWording('form_success') );
                alert(that.getWording('form.success'));
                that.close();

                // dataLocation.location['marketEntry'] = response.marketentry.persistenceObjectIdentifier;
                // APP.getDataManager().addLocation(dataLocation, function(){
                // 	// alert('marketLocation sent, thanks');
                // });
            });

            // send outgoing message
            var entryTypes = {0: 'Orga', 1: 'Börse', 2: 'Event'};

            // send slack message
            APP.getDataManager().createSlackMessage({
                // heading: type + ' von _' + dataMarketEntry.marketentry.speakerPublic + '_ (' + dataMarketEntry.marketentry.mail + ')',
                heading: function () {
                    var entryTypeString = entryTypes[dataMarketEntry.marketentry.type];
                    var marketTypeString = (dataMarketEntry.marketentry.offer) ? 'Angebot' : 'Gesuch';
                    if (dataMarketEntry.marketentry.type == 1) entryTypeString += ' (' + marketTypeString + ')'
                    return 'Neuer Eintrag: ' + entryTypeString + ' "' + dataMarketEntry.marketentry.name + '"'
                }(),
                message: '```\n' + dataMarketEntry.marketentry.description + '\n```\n'
                + 'für Kinder: `' + (dataMarketEntry.marketentry.forChildren ? 'ja' : 'nicht explizit') + '`\n'
                + 'Unterstützer gesucht: `' + (dataMarketEntry.marketentry.supportWanted ? 'ja' : 'nein') + '`\n'
                + 'Kontaktperson: `' + dataMarketEntry.marketentry.speakerPublic + '`\n'
                + 'Sprachen: `' + dataMarketEntry.marketentry.spokenLanguages + '`\n'
                + 'mail: `' + dataMarketEntry.marketentry.mail + '` '
                + 'web: `' + dataMarketEntry.marketentry.web + '` '
                + 'facebook: `' + dataMarketEntry.marketentry.facebook + '` '
                + 'phone: `' + dataMarketEntry.marketentry.phone + '`\n'
                + 'Ort: `' + dataLocation.location.placename + ', ' + dataLocation.location.street + ', ' + dataLocation.location.zip + ' ' + dataLocation.location.city + '`\n'
                + 'von: `' + dataMarketEntry.marketentry.dateFrom + ' (' + dataMarketEntry.marketentry.timeFrom + ')' + '`\n'
                + 'bis: `' + dataMarketEntry.marketentry.dateTo + ' (' + dataMarketEntry.marketentry.timeTo + ')' + '`\n\n'
            });

            // send mail to team inbox
            APP.getDataManager().sendMail({
                data: {
                    mail_fromMail: 'bot@afeefa.de',
                    mail_fromName: dataMarketEntry.marketentry.speakerPublic ? dataMarketEntry.marketentry.speakerPublic : 'Unbekannt',
                    mail_to: 'redaktion@afeefa.de',
                    mail_replyTo: dataMarketEntry.marketentry.mail,
                    mail_subject: function () {
                        var entryTypeString = entryTypes[dataMarketEntry.marketentry.type];
                        var marketTypeString = (dataMarketEntry.marketentry.offer) ? 'Angebot' : 'Gesuch';
                        if (dataMarketEntry.marketentry.type == 1) entryTypeString += ' (' + marketTypeString + ')'
                        return '[Neuer Eintrag] ' + entryTypeString + ' "' + dataMarketEntry.marketentry.name + '"';
                    },
                    mail_bodyPlain: dataMarketEntry.marketentry.description,
                    mail_bodyHtml: function () {
                        // var date = new Date();
                        // var dateString = date.getDate() + '.' + (date.getMonth()+1) + '.' + date.getFullYear() + ' um ' + date.getHours() + ':' + date.getMinutes();
                        var styles = '<style>table td {vertical-align:top; font-size: 0.8em;}</style>';
                        var message = '<table border="0">'
                            + '<tr><td style="color: gray">Beschreibung:</td><td>' + dataMarketEntry.marketentry.description + '</td></tr>'
                            + '<tr><td style="color: gray">für Kinder geeignet:</td><td>' + (dataMarketEntry.marketentry.forChildren ? 'ja' : 'nicht explizit') + '</td></tr>'
                            + '<tr><td style="color: gray">Unterstützer gesucht:</td><td>' + (dataMarketEntry.marketentry.supportWanted ? 'ja' : 'nein') + '</td></tr>'
                            + '<tr><td style="color: gray">Kontaktperson:</td><td>' + dataMarketEntry.marketentry.speakerPublic + '</td></tr>'
                            + '<tr><td style="color: gray">Sprachen:</td><td>' + dataMarketEntry.marketentry.spokenLanguages + '</td></tr>'
                            + '<tr><td style="color: gray">Mail:</td><td>' + dataMarketEntry.marketentry.mail + '</td></tr>'
                            + '<tr><td style="color: gray">Website:</td><td>' + dataMarketEntry.marketentry.web + '</td></tr>'
                            + '<tr><td style="color: gray">facebook:</td><td>' + dataMarketEntry.marketentry.facebook + '</td></tr>'
                            + '<tr><td style="color: gray">Telefon:</td><td>' + dataMarketEntry.marketentry.phone + '</td></tr>'
                            + '<tr><td style="color: gray">Ort:</td><td>' + dataLocation.location.placename + ', ' + dataLocation.location.street + ', ' + dataLocation.location.zip + ' ' + dataLocation.location.city + '</td></tr>'
                            + '<tr><td style="color: gray">von:</td><td>' + dataMarketEntry.marketentry.dateFrom + ' (' + dataMarketEntry.marketentry.timeFrom + ')' + '</td></tr>'
                            + '<tr><td style="color: gray">bis:</td><td>' + dataMarketEntry.marketentry.dateTo + ' (' + dataMarketEntry.marketentry.timeTo + ')' + '</td></tr>'
                            + '</table>';
                        return styles + message;
                    }
                }
            });

        }
    }
});