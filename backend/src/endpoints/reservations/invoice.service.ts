import { HttpService, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Builder, parseStringPromise } from 'xml2js';
import * as FormData from 'form-data';
import { ReservationDto } from 'src/dto/reservation.dto';
import { ProformResponse } from 'src/interfaces/reservation.interface';
import { XmlService } from './xml.service';

@Injectable()
export class InvoiceService {

    constructor(
        private http: HttpService,
        private xml: XmlService,
        private readonly configService: ConfigService
    ) { }

    createXML(reservationData: ReservationDto, isProform: boolean): string {
        const
            builder = new Builder({
                renderOpts: {
                    'pretty': true,
                    'indent': '    ',
                    'newline': '\n'
                },
                xmldec: {
                    'version': '1.0',
                    'encoding': 'UTF-8'
                }
            });

        return builder.buildObject(this.xml.prepareXML(reservationData, isProform));
    }

    async makeRequest(payload): Promise<any> {
        const
            invoiceUri = this.configService.get<string>('INVOICE_URI'),
            response = await this.http.post(
                invoiceUri,
                payload,
                {
                    headers: {
                        'Content-Type': `multipart/form-data; boundary=${payload._boundary}`
                    }
                }
            ).toPromise()
        return response
    }

    async createInvoice(reservationData: ReservationDto, isProForm: boolean): Promise<ProformResponse> {

        const
            formData = new FormData(),
            xmlString = this.createXML(reservationData, isProForm);

        formData.append('action-xmlagentxmlfile', xmlString, { filename: 'request.xml' });

        const
            responseXml = await this.makeRequest(formData),
            response = (await parseStringPromise(responseXml.data, { explicitArray: false })).xmlszamlavalasz,
            success = response.sikeres === 'true' ? true : false;

        return {
            success,
            data: (success ? response.szamlaszam : response.hibauzenet)
        }
    }

}