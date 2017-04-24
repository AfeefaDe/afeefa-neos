qx.Class.define("FormView", {

    extend: View,
    type: "singleton",

    properties: {
        baseUrl: {},
        formTypes: {},
        currentForm: {}
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

        that.setCurrentForm(null);
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
                    $(el).material_select();
                    $(el).addClass('hidden');
                });

                that.parseForm(type, options);
                that.loadUIVocab(type);
                that.scrollContainer.perfectScrollbar('update');
            });

            that.view.addClass('active');
            that.isActive(true);
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

                // skip additional input elements, which were created by materialize multi select only for visual purpose
                if( $el.hasClass('select-dropdown') ) return;
                if( $el.parents('ul').first().hasClass('multiple-select-dropdown') ) return;

                form.fields[$el.attr('id')] = {
                    modelAttr: $el.attr('id'),
                    el: $el
                }
            });

            // the cancel button
            that.view.find('button#cancel').first().click(function(){
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

            that.loading(true);

            var data = that.readForm();
            console.debug(data);

            // call specific send method and give callback
            that.getCurrentForm().formType.sendMethod(data, options, function(){
                that.createModal({
                    content: $('<h5>Nachricht wurde erfolgreich verschickt.</5>'),
                    dismissible: true,
                    buttonLabel: "Schön",
                    actions: {
                        ready: function(){},
                        close: function(){ 
                            that.close();
                        }
                    }
                });
            });
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
                    alert(that.getWording('form.fail'));
                    that.loading(false);
                    return;
                }

                cb();
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
                message: '```\n' + data.entry.descriptionShort + '\n```\n'
                + 'für Kinder: `' + (data.entry.forChildren ? 'ja' : '-') + '`\n'
                + 'Unterstützer gesucht: `' + (data.entry.supportWanted ? 'ja' : 'nein') + '`\n'
                + 'Kontaktperson: `' + data.entry.speakerPublic + '`\n'
                + 'Sprachen: `' + data.entry.spokenLanguages + '`\n'
                + 'mail: `' + data.entry.mail + '` '
                + 'web: `' + data.entry.web + '` '
                + 'facebook: `' + data.entry.facebook + '` '
                + 'phone: `' + data.entry.phone + '`\n'
                + 'Ort: `' + data.location.placename + ', ' + data.location.street + ', ' + data.location.zip + ' ' + data.location.city + '`\n'
                + 'von: `' + data.entry.dateFrom + ' (' + data.entry.timeFrom + ')' + '`\n'
                + 'bis: `' + data.entry.dateTo + ' (' + data.entry.timeTo + ')' + '`\n'
                + 'Anmerkung: `' + data.additional.internalComment + '`\n'
            });

            // send mail to team inbox
            APP.getDataManager().sendMail({
                data: {
                    mail_fromMail: 'bot@afeefa.de',
                    mail_fromName: data.entry.speakerPublic ? data.entry.speakerPublic : 'Unbekannt',
                    mail_to: 'redaktion@afeefa.de',
                    mail_replyTo: data.entry.mail,
                    mail_subject: function () {
                        var entryTypeString = entryTypes[data.entry.type];
                        var marketTypeString = (data.entry.offer) ? 'Angebot' : 'Gesuch';
                        if (data.entry.type == 1) entryTypeString += ' (' + marketTypeString + ')'
                        return '[Neuer Eintrag] ' + entryTypeString + ' "' + data.entry.name + '"';
                    },
                    mail_bodyPlain: data.entry.description,
                    mail_bodyHtml: function () {
                        // var date = new Date();
                        // var dateString = date.getDate() + '.' + (date.getMonth()+1) + '.' + date.getFullYear() + ' um ' + date.getHours() + ':' + date.getMinutes();
                        var styles = '<style>table td {vertical-align:top; font-size: 0.8em;}</style>';
                        var message = '<table border="0">'
                            + '<tr><td style="color: gray">Beschreibung:</td><td>' + data.entry.description + '</td></tr>'
                            + '<tr><td style="color: gray">für Kinder geeignet:</td><td>' + (data.entry.forChildren ? 'ja' : 'nicht explizit') + '</td></tr>'
                            + '<tr><td style="color: gray">Unterstützer gesucht:</td><td>' + (data.entry.supportWanted ? 'ja' : 'nein') + '</td></tr>'
                            + '<tr><td style="color: gray">Kontaktperson:</td><td>' + data.entry.speakerPublic + '</td></tr>'
                            + '<tr><td style="color: gray">Sprachen:</td><td>' + data.entry.spokenLanguages + '</td></tr>'
                            + '<tr><td style="color: gray">Mail:</td><td>' + data.entry.mail + '</td></tr>'
                            + '<tr><td style="color: gray">Website:</td><td>' + data.entry.web + '</td></tr>'
                            + '<tr><td style="color: gray">facebook:</td><td>' + data.entry.facebook + '</td></tr>'
                            + '<tr><td style="color: gray">Telefon:</td><td>' + data.entry.phone + '</td></tr>'
                            + '<tr><td style="color: gray">Ort:</td><td>' + data.location.placename + ', ' + data.location.street + ', ' + data.location.zip + ' ' + data.location.city + '</td></tr>'
                            + '<tr><td style="color: gray">von:</td><td>' + data.entry.dateFrom + ' (' + data.entry.timeFrom + ')' + '</td></tr>'
                            + '<tr><td style="color: gray">bis:</td><td>' + data.entry.dateTo + ' (' + data.entry.timeTo + ')' + '</td></tr>'
                            + '<tr><td style="color: gray">Anmerkung:</td><td>' + data.entry.internalComment + '</td></tr>'
                            + '</table>';
                        return styles + message;
                    }
                }
            });
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

        addEvents: function () {
            var that = this;

            // call superclass
            this.base(arguments);
        },

        reset: function () {
            var that = this;

            that.scrollContainer.empty();

            that.loading(false);
        },

        close: function () {
            var that = this;

            that.reset();
            that.setCurrentForm(null);
            that.view.removeClass('active');
            that.isActive(false);
        },

        changeLanguage: function () {
            var that = this;

            if (that.getCurrentForm()) that.load( that.getCurrentForm().formType.name );
        }
    }
});