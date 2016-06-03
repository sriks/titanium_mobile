/**
 * Appcelerator Titanium Mobile
 * Copyright (c) 2009-2016 by Appcelerator, Inc. All Rights Reserved.
 * Licensed under the terms of the Apache Public License
 * Please see the LICENSE included with this distribution for details.
 */
#import "TiProxy.h"

#ifdef USE_TI_CALENDAR

@class CalendarModule;
@class EKParticipant;

@interface TiCalendarAttendee : TiProxy {
@private
    CalendarModule* module;
    EKParticipant* participant;
    BOOL isOrganiser;
}

-(id)_initWithPageContext:(id<TiEvaluator>)context participant:(EKParticipant*)participant_ isOrganiser:(BOOL)_isOrganiser module:(CalendarModule*)module_;
@end

#endif